let firstName = document.getElementById("firstName");
let LastName = document.getElementById("lastName");
let contactNumber = document.getElementById("contactNumber");
let alternateNumber = document.getElementById("alternateNumber");
let emailId = document.getElementById("emailId");
let comment = document.getElementById("comment");
let Contactaddress = document.getElementById("Contactaddress");
let ContactState = document.getElementById("ContactState");
let ContactDistrict = document.getElementById("ContactDistrict");
let ContactCity = document.getElementById("ContactCity");
let ContactPincode = document.getElementById("ContactPincode");

let firstName1 = document.getElementById("firstName1");
let LastName1 = document.getElementById("lastName1");
let contactNumber1 = document.getElementById("contactNumber1");
let alternateNumber1 = document.getElementById("alternateNumber1");
let emailId1 = document.getElementById("emailId1");
let comment1 = document.getElementById("comment1");
let Contactaddress1 = document.getElementById("Contactaddress1");
let ContactState1 = document.getElementById("ContactState1");
let ContactDistrict1 = document.getElementById("ContactDistrict1");
let ContactCity1 = document.getElementById("ContactCity1");
let ContactPincode1 = document.getElementById("ContactPincode1");

function fillContactForm(dataObj) {
  firstName.value = dataObj.firstName;
  LastName.value = dataObj.LastName;
  contactNumber.value = dataObj.contactNumber;
  alternateNumber.value = dataObj.alternateNumber;
  emailId.value = dataObj.emailId;
  comment.value = dataObj.comment;
  Contactaddress.value = dataObj.Contactaddress;
  ContactState.value = dataObj.ContactState;
  ContactDistrict.value = dataObj.ContactDistrict;
  ContactCity.value = dataObj.ContactCity;
  ContactPincode.value = dataObj.ContactPincode;
}

function fillduplicateContactForm() {
  console.log("duplicate farm opened");
  firstName1.value = firstName.value;
  LastName1.value = LastName.value;
  contactNumber1.value = contactNumber.value;
  alternateNumber1.value = alternateNumber.value;
  emailId1.value = emailId.value;
  comment1.value = comment.value;
  Contactaddress1.value = Contactaddress.value;
  ContactState1.value = ContactState.value;
  ContactDistrict1.value = ContactDistrict.value;
  ContactCity1.value = ContactCity.value;
  ContactPincode1.value = ContactPincode.value;
}

async function checkUpdateandUpdateContact(contactData, user) {
  const  newfirstName = document.getElementById("firstName1").value;
  const  newLastName  = document.getElementById("lastName1").value;
  const newNumber     = document.getElementById("contactNumber1").value;
  const  newalternateNumber = document.getElementById("alternateNumber1").value;
  const newEmail = document.getElementById("emailId1").value;
  const newComment = document.getElementById("comment1").value;
  const newAddress = document.getElementById("Contactaddress1").value;
  const newState  = document.getElementById("ContactState1").value;
  const newDistrict = document.getElementById("ContactDistrict1").value;
  const newCity = document.getElementById("ContactCity1").value;
  const newPinCode =document.getElementById("ContactPincode1").value;
  // check if form is modified
  if (
    newfirstName != contactData.firstName ||
    newLastName != contactData.LastName ||
    newalternateNumber != contactData.alternateNumber ||
    newEmail != contactData.emailId ||
    newComment != contactData.comment ||
    newAddress != contactData.Contactaddress ||
    newState != contactData.ContactState ||
    newDistrict != contactData.ContactDistrict ||
    newCity != contactData.ContactCity ||
    newPinCode != contactData.ContactPincode

  ) {
    // form is modified
    if (contactData.firstName === "") {
      // fresh entry
      const sendingdata = {
        user: user,
        isFresh: true,
        data: {
          firstName: newfirstName,
          LastName: newLastName,
          contactNumber:newNumber,
          alternateNumber: newalternateNumber,
          emailId: newEmail,
          comment: newComment,
          Contactaddress:newAddress,
          ContactState : newState,
          ContactDistrict : newDistrict,
          ContactCity : newCity,
          ContactPincode : newPinCode
        },
      };
      const url = "/addModifyContact";
      // Make a edit request to the server
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(sendingdata),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // const data={message:"Sucess dial req received"};
          displayMessage(data.message);
        })
        .catch((error) => {
          console.error("Error sending contact modify request:", error);
        });
    } else {
      // modified entry
      const sendingdata = {
        user: user,
        isFresh: false,
        data: {
            firstName: newfirstName,
            LastName: newLastName,
            contactNumber:newNumber,
            alternateNumber: newalternateNumber,
            emailId: newEmail,
            comment: newComment,
            Contactaddress:newAddress,
            ContactState : newState,
            ContactDistrict : newDistrict,
            ContactCity : newCity,
            ContactPincode : newPinCode
        },
      };
      const url = "/addModifyContact";
      // Make a edit request to the server
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //"Authorization": `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(sendingdata),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // const data={message:"Sucess dial req received"};
          displayMessage(data.message);
        })
        .catch((error) => {
          console.error("Error sending contact modify request:", error);
        });
    }
  } else {
    // Not to do anything
  }
}
