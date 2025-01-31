// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelanceDapp {
    struct Bid {
        address freelancer;
        uint256 amount;
        bool accepted;
    }

    struct Project {
        address client;
        string description;
        uint256 budget;
        bool completed;
        bool paid;
        address acceptedFreelancer;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Bid[]) public projectBids;
    uint256 public projectCount;

    event ProjectCreated(uint256 projectId, address client, string description, uint256 budget);
    event BidPlaced(uint256 projectId, address freelancer, uint256 amount);
    event BidAccepted(uint256 projectId, address freelancer);
    event ProjectCompleted(uint256 projectId);
    event PaymentReleased(uint256 projectId, address freelancer, uint256 amount);

    modifier onlyClient(uint256 _projectId) {
        require(msg.sender == projects[_projectId].client, "Only client can perform this action");
        _;
    }

    modifier onlyAcceptedFreelancer(uint256 _projectId) {
        require(msg.sender == projects[_projectId].acceptedFreelancer, "Only accepted freelancer can perform this action");
        _;
    }

    function createProject(string memory _description, uint256 _budget) external {
        projectCount++;
        projects[projectCount] = Project({
            client: msg.sender,
            description: _description,
            budget: _budget,
            completed: false,
            paid: false,
            acceptedFreelancer: address(0)
        });

        emit ProjectCreated(projectCount, msg.sender, _description, _budget);
    }

    function placeBid(uint256 _projectId, uint256 _amount) external {
        require(_projectId <= projectCount, "Project does not exist");
        require(!projects[_projectId].completed, "Project already completed");
        require(_amount <= projects[_projectId].budget, "Bid amount exceeds budget");

        projectBids[_projectId].push(Bid({
            freelancer: msg.sender,
            amount: _amount,
            accepted: false
        }));

        emit BidPlaced(_projectId, msg.sender, _amount);
    }

    function getBidsCount(uint256 _projectId) external view returns (uint256) {
        return projectBids[_projectId].length;
    }

    function acceptBid(uint256 _projectId, uint256 _bidIndex) external onlyClient(_projectId) {
        require(!projects[_projectId].completed, "Project already completed");
        require(_bidIndex < projectBids[_projectId].length, "Invalid bid index");
        require(!projectBids[_projectId][_bidIndex].accepted, "Bid already accepted");

        projectBids[_projectId][_bidIndex].accepted = true;
        projects[_projectId].acceptedFreelancer = projectBids[_projectId][_bidIndex].freelancer;

        emit BidAccepted(_projectId, projectBids[_projectId][_bidIndex].freelancer);
    }

    function markProjectCompleted(uint256 _projectId) external onlyAcceptedFreelancer(_projectId) {
        require(!projects[_projectId].completed, "Project already marked as completed");
        
        projects[_projectId].completed = true;
        
        emit ProjectCompleted(_projectId);
    }

    function releasePayment(uint256 _projectId) external onlyClient(_projectId) payable {
        require(projects[_projectId].completed, "Project not completed yet");
        require(!projects[_projectId].paid, "Payment already released");
        require(msg.value >= projects[_projectId].budget, "Insufficient payment amount");

        projects[_projectId].paid = true;
        payable(projects[_projectId].acceptedFreelancer).transfer(msg.value);

        emit PaymentReleased(_projectId, projects[_projectId].acceptedFreelancer, msg.value);
    }
}