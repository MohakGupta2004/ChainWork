# Work3

## Overview

The Freelance DApp is a decentralized application built on the Ethereum blockchain that connects freelancers with clients. It allows clients to post projects, freelancers to place bids, and clients to manage their projects and payments securely. The application leverages smart contracts to ensure transparency and trust in the bidding and payment processes.

## Features

### Client Features
- **Create Projects**: Clients can create new projects by providing a title, description, and budget.
- **View Bids**: Clients can view bids from freelancers for their projects.
- **Manage Projects**: Clients can mark projects as completed and make payments to freelancers.
- **Chat with freelancers**: Clients can chat with Freelancers.

### Freelancer Features
- **Browse Jobs**: Freelancers can browse available jobs and view project details.
- **Place Bids**: Freelancers can place bids on projects they are interested in.
- **Manage Bids**: Freelancers can view their accepted bids and the status of their projects.
- **Chat with clients**: Freelancers can chat with clients.

## Technologies Used

- **Smart Contracts**: Solidity
- **Frontend**: React.js
- **Backend**: Bun.js with Express && Socket.io 
- **Blockchain**: Ethereum
- **Web3 Integration**: Ethers.js and Web3.js

## Installation

### Prerequisites

- Bun 
- npm (Node Package Manager)
- Hardhat (for smart contract development)
- MetaMask (for interacting with the Ethereum blockchain)

### Clone the Repository

```bash
git clone https://github.com/MohakGupta2004/Work3.git
cd Work3 
```

### Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### Smart Contract Deployment

1. Navigate to the `scripts` directory and deploy the smart contracts:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

2. Make sure to start a local Ethereum node:

```bash
npx hardhat node
```

### Running the Application

1. **Start the Backend Server**:

```bash
npm i
cd api
npm run dev 
```

2. **Start the Frontend Application**:

```bash
npm i
cd client
npm run dev 
```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

### Client Side
- **Create a New Project**: Navigate to the "Create Project" page and fill out the project form.
- **View Bids**: Go to "My Projects" to view bids from freelancers and accept them.
- **Mark Projects as Completed**: Once a project is finished, mark it as completed and make payments.

### Freelancer Side
- **Browse Available Jobs**: Navigate to the "Job Listings" page to view available projects.
- **Place Bids**: Click on a project to view details and place a bid.
- **Manage Accepted Bids**: Go to "My Bids" to see your accepted bids and their statuses.

## File Structure

```
/contracts
    ├── FreelanceDapp.sol          # Smart contract for managing projects and bids
    ├── PaymentDapp.sol 
/client
    ├── /pages                      # React components for different pages
    │   ├── MyJobs.jsx              # Page for freelancers to manage their jobs
    │   ├── MyBids.jsx              # Page for freelancers to view their bids
    │   ├── CreateProject.jsx        # Page for clients to create new projects
    │   ├── Messages.jsx  
    │   ├── JobListings.jsx          # Page for freelancers to browse jobs
    │   ├── ClientProjectDetails.jsx  # Page for clients to view project details
    │   ├── Wallet.jsx               # Page for managing wallet connections
    │   ├── App.jsx                  # Main application component
    ├── /context                     # Context for managing authentication
    │   ├── AuthContext.jsx
        ├── SocketContext.jsx 
/api
    ├── index.ts                    # Main entry point for the API
    ├── /controllers                 # Controllers for handling API requests
    │   ├── clientController.ts      # Controller for client-related API endpoints
    │   ├── freelancerController.ts   # Controller for freelancer-related API endpoints
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Ethereum community for their resources and support.
- Special thanks to the developers of Hardhat, Ethers.js, and React.js for their amazing tools.
