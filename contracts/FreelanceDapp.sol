// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceDapp {
    struct Bid {
        address freelancer;
        uint256 amount;
        string comment;
        bool accepted;
        bool completed;
        address client;
    }

    struct Project {
        address client;
        string title;
        string description;
        uint256 budget;
        bool completed;
        address acceptedFreelancer;
        uint256 completionTimestamp;
        bool approved;
        uint256 approvalTimestamp;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Bid[]) public projectBids;
    uint256 public projectCount;

    event ProjectCreated(
        uint256 projectId, 
        address client, 
        string title,
        string description, 
        uint256 budget
    );
    event BidPlaced(uint256 projectId, address freelancer, uint256 amount);
    event BidAccepted(uint256 projectId, address freelancer);
    event ProjectCompleted(uint256 projectId);
    event ProjectApproved(uint256 projectId);
    event ProjectApprovalCanceled(uint256 projectId);
    event ProjectDeleted(uint256 projectId);

    modifier onlyClient(uint256 _projectId) {
        require(msg.sender == projects[_projectId].client, "Only client can perform this action");
        _;
    }

    modifier onlyAcceptedFreelancer(uint256 _projectId) {
        require(msg.sender == projects[_projectId].acceptedFreelancer, "Only accepted freelancer can perform this action");
        _;
    }

    function createProject(
        string memory _title,
        string memory _description,
        uint256 _amount
    ) external {
        require(_amount > 0, "Budget must be greater than zero");
        
        projectCount++;
        projects[projectCount] = Project({
            client: msg.sender,
            title: _title,
            description: _description,
            budget: _amount,
            completed: false,
            acceptedFreelancer: address(0),
            completionTimestamp: 0,
            approved: false,
            approvalTimestamp: 0
        });

        emit ProjectCreated(
            projectCount, 
            msg.sender, 
            _title,
            _description, 
            _amount
        );
    }

    function deleteProject(uint256 _projectId) public {
        Project storage project = projects[_projectId];

        // Ensure the caller is the project owner
        require(msg.sender == project.client, "Only the project owner can delete this project");

        // Delete the project
        delete projects[_projectId];

        // Emit an event
        emit ProjectDeleted(_projectId);
    } 

    function placeBid(uint256 _projectId, uint256 _amount, string memory _comment) external {
        require(_projectId <= projectCount, "Project does not exist");
        require(!projects[_projectId].completed, "Project already completed");
        require(msg.sender != projects[_projectId].client, "Client cannot bid on their own project");

        projectBids[_projectId].push(Bid({
            freelancer: msg.sender,
            amount: _amount,
            comment: _comment,
            accepted: false,
            completed: false,
            client: projects[_projectId].client
        }));

        emit BidPlaced(_projectId, msg.sender, _amount);
    }

    function getBidsCount(uint256 _projectId) external view returns (uint256) {
        return projectBids[_projectId].length;
    }

    function acceptBid(uint256 _projectId, uint256 _bidIndex) external onlyClient(_projectId) {
    require(_bidIndex < projectBids[_projectId].length, "Invalid bid index");
    require(projects[_projectId].acceptedFreelancer == address(0), "A bid has already been accepted");

    // Mark the bid as accepted.
    projectBids[_projectId][_bidIndex].accepted = true;
    
    // Update the project's accepted freelancer.
    projects[_projectId].acceptedFreelancer = projectBids[_projectId][_bidIndex].freelancer;
    
    // Update the project's budget to the accepted bid's amount.
    projects[_projectId].budget = projectBids[_projectId][_bidIndex].amount;

    emit BidAccepted(_projectId, projectBids[_projectId][_bidIndex].freelancer);
}


    function markProjectCompleted(uint256 _projectId) external onlyAcceptedFreelancer(_projectId) {
    require(!projects[_projectId].completed, "Project already completed");

    // Mark the project as completed
    projects[_projectId].completed = true;
    projects[_projectId].completionTimestamp = block.timestamp;

    // Loop through the bids for the project and mark the accepted bid as completed
    Bid[] storage bids = projectBids[_projectId];
    for (uint256 i = 0; i < bids.length; i++) {
        if (bids[i].accepted) {
            bids[i].completed = true;
            // If only one bid can be accepted per project, you can break early:
            break;
        }
    }

    emit ProjectCompleted(_projectId);
}


    function getAllProjects() external view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](projectCount);

        for (uint256 i = 1; i <= projectCount; i++) {
            allProjects[i - 1] = projects[i];
        }

        return allProjects;
    }

    function getBid(uint256 _projectId, uint256 _bidIndex) external view returns (
        address freelancer,
        uint256 amount,
        bool accepted
    ) {
        Bid memory bid = projectBids[_projectId][_bidIndex];
        return (bid.freelancer, bid.amount, bid.accepted);
    }

    function getProject(uint256 _projectId) external view returns (Project memory) {
        return projects[_projectId];
    }

    function getAllProjectsByClient(address _client) external view returns (Project[] memory) {
        uint256 totalProjects = 0;

        // Count total projects for the client
        for (uint256 i = 1; i <= projectCount; i++) {
            if (projects[i].client == _client) {
                totalProjects++;
            }
        }

        // Create an array to hold the projects
        Project[] memory clientProjects = new Project[](totalProjects);
        uint256 index = 0;

        // Populate the array with projects for the client
        for (uint256 i = 1; i <= projectCount; i++) {
            if (projects[i].client == _client) {
                clientProjects[index] = projects[i];
                index++;
            }
        }

        return clientProjects;
    }

    function getAllBidsByFreelancer(address _freelancer) external view returns (Bid[] memory) {
        uint256 totalBids = 0;
        for (uint256 i = 1; i <= projectCount; i++) {
            for (uint256 j = 0; j < projectBids[i].length; j++) {
                if (projectBids[i][j].freelancer == _freelancer) {
                    totalBids++;
                }
            }
        }

        Bid[] memory freelancerBids = new Bid[](totalBids);
        uint256 index = 0;
        for (uint256 i = 1; i <= projectCount; i++) {
            for (uint256 j = 0; j < projectBids[i].length; j++) {
                if (projectBids[i][j].freelancer == _freelancer) {
                    freelancerBids[index] = projectBids[i][j];
                    index++;
                }
            }
        }
        return freelancerBids;
    }

    // New function to get all bids for a specific project ID
    function getBidsByProjectId(uint256 _projectId) external view returns (Bid[] memory) {
        require(_projectId <= projectCount, "Project does not exist");
        return projectBids[_projectId];
    }
}
