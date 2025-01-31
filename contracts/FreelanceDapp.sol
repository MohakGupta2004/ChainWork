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
        string title;
        string description;
        uint256 budget;
        bool completed;
        bool paid;
        address acceptedFreelancer;
        uint256 escrowAmount;
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
    event PaymentReleased(uint256 projectId, address freelancer, uint256 amount);
    event FundsDeposited(uint256 projectId, address client, uint256 amount);

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
        uint _amount
    ) external payable {
        require(msg.value > 0, "Must deposit funds for the project");
        
        projectCount++;
        projects[projectCount] = Project({
            client: msg.sender,
            title: _title,
            description: _description,
            budget: _amount,
            completed: false,
            paid: false,
            acceptedFreelancer: address(0),
            escrowAmount: msg.value
        });

        emit ProjectCreated(
            projectCount, 
            msg.sender, 
            _title,
            _description, 
            msg.value
        );
        emit FundsDeposited(projectCount, msg.sender, msg.value);
    }

    function placeBid(uint256 _projectId, uint256 _amount) external {
        require(_projectId <= projectCount, "Project does not exist");
        require(!projects[_projectId].completed, "Project already completed");
        require(msg.sender != projects[_projectId].client, "Client cannot bid on their own project");

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
        require(projects[_projectId].acceptedFreelancer == address(0), "A bid has already been accepted for this project");

        projectBids[_projectId][_bidIndex].accepted = true;
        projects[_projectId].acceptedFreelancer = projectBids[_projectId][_bidIndex].freelancer;

        emit BidAccepted(_projectId, projectBids[_projectId][_bidIndex].freelancer);
    }

    function markProjectCompleted(uint256 _projectId) external onlyAcceptedFreelancer(_projectId) {
        require(!projects[_projectId].completed, "Project already marked as completed");
        
        projects[_projectId].completed = true;
        
        emit ProjectCompleted(_projectId);
    }

    function releasePayment(uint256 _projectId) external onlyClient(_projectId) {
        require(projects[_projectId].completed, "Project not completed yet");
        require(!projects[_projectId].paid, "Payment already released");
        require(projects[_projectId].escrowAmount > 0, "No funds in escrow");

        uint256 paymentAmount = projects[_projectId].escrowAmount;
        projects[_projectId].escrowAmount = 0;
        projects[_projectId].paid = true;
        
        payable(projects[_projectId].acceptedFreelancer).transfer(paymentAmount);

        emit PaymentReleased(_projectId, projects[_projectId].acceptedFreelancer, paymentAmount);
    }

    // Function to get project details
    function getProject(uint256 _projectId) external view returns (
        address client,
        string memory title,
        string memory description,
        uint256 budget,
        bool completed,
        bool paid,
        address acceptedFreelancer,
        uint256 escrowAmount
    ) {
        Project memory project = projects[_projectId];
        return (
            project.client,
            project.title,
            project.description,
            project.budget,
            project.completed,
            project.paid,
            project.acceptedFreelancer,
            project.escrowAmount
        );
    }

    // Function to get bid details
    function getBid(uint256 _projectId, uint256 _bidIndex) external view returns (
        address freelancer,
        uint256 amount,
        bool accepted
    ) {
        Bid memory bid = projectBids[_projectId][_bidIndex];
        return (bid.freelancer, bid.amount, bid.accepted);
    }

    function getAllProjects() external view returns (Project[] memory) {
    Project[] memory allProjects = new Project[](projectCount);

    for (uint256 i = 1; i <= projectCount; i++) {
        allProjects[i - 1] = projects[i];
    }

    return allProjects;
}

}