pragma solidity >=0.5.0;

import "./Initializable.sol";

 contract Funding is Initializable {
     uint256 public projectCount;
     uint256 public sponsorshipCount;
     string public name;
     string public symbol;
     mapping(uint256 => MetadataProject) public projects;
     mapping(uint256 => MetadataSponsor) public sponsors;


     struct MetadataSponsor {
         uint256 id;
         address buyer;
         string projectId;
         string projectTitle;
         string description;
         uint256 dateBought;

     }
     struct minFunding{
         uint256 requiredValue;
         bool availableforfunding;

     }
     struct MetadataProject {
         uint256 id;
         address owner;
         string title;
         string description;
         minFunding price;

     }

    event ProjectUploaded(
        uint256 id,
        address owner,
        string title,
        string description,
        uint256 projectId,
        minFunding price

    );

    event projectStatusChanged(
        uint256 projectId,
        address owner,
        bool availableforfunding
    );
    event ProjectFunded (

        uint256 id,
        address buyer,
        minFunding requiredValue
    );
        event projectStatusChanged(
            uint256 projectId,
            address owner,
            uint256 newAvailableForFunding
        );

    
    function initialize() public initializer {
        projectCount = 0;
        sponsorshipCount = 0;
        name = "Project";
        symbol = "PROJECT";
    }

    function uploadProject(
        string memory title,
        string memory description,
       
        minFunding memory price

    ) public {
        
        require(bytes(title).length > 0 );
        require(msg.sender != address(0));
        
        //intreaba badica
        projectCount++;
        projects[projectCount] = MetadataProject(
            projectCount,
            msg.sender,
            
            title,
            description,
           
            price
            

        );
    }

    function changeProjectStatus(uint256 projectId, bool newAvailableForFunding)
        public {
            require(msg.sender != address(0));
            projects[projectId].price.availableforfunding = newAvailableForFunding;

    }
        function fundProject(uint256 projectId) external payable {
            require(msg.sender != address(0));
            require(msg.value >= projects[projectId].price.requiredValue,
            "You don't have enough funds in your crypto wallet"
            );

            require(
                projects[projectId].price.availableforfunding == true,
                "The transaction can't be processed due to the unavilability of the project"

            
            );
            (bool success,) = projects[projectId].owner.call{value: msg.value}("");
            require (success, "Transfer failed");
                projects[projectId].owner = msg.sender;
                projects[projectId].price.availableforfunding = false;
                projects[projectId].price.availableforfunding = false;
            
            emit ProjectFunded(projectId, msg.sender, projects[projectId].price);
        }

 }