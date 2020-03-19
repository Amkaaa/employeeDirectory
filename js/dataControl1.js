$(document).ready(function(){
  $( "#tabs" ).tabs().attr("aria-expanded", false);
    $.ajax('http://wso2app-test.xac0000.mn:80/services/getDepartmentList', {
      type: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Source" : "KHBZ",
          "Function" : "getDepartmentList",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "E6ACA09B27CE2E0A9FB4A85FF2153120"
      },
      success: function(data,status,xhr) {
          var department = data.Response.Department;
          for(let i = 0; i < department.length;  i++ ){
              if(department[i].depTypeId == 3){
                  $("#showSiteTwo").append(`<li class="siteTwo-item"><a id="d${department[i].departID}">${department[i].departName}</a></li>`);
              } else {
                  $("#showSiteOne").append(`<li class="siteOne-item"><a id="d${department[i].departID}">${department[i].departName}</a></li>`);
              }
          }
      },
      error: function(jqXhr, textStatus, errorMessage) {
          console.log("Ажлын газрын нэрс авах дата сервертэй холбогдсонгүй");
          $(".query-result").empty();
          $(".query-result").append(`<div class="loading-container">
                                            <div class="circle"></div>
                                            <div class="circle"></div>
                                          </div>`);
      },
    }).done(function(data){
      // alert("data tataj duussan")
        /* Шаардлагатай тохиолдолд ашиглана гэж үзээд үлдээлээ. */
    });

    $.ajax("http://wso2app-test.xac0000.mn:80/services/getNewEmp", {
      type: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Source" : "KHBZ",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
      },
      success: function(data,status,xhr) {
        let newEmp = data.Response.Employee;
        if(Array.isArray(newEmp) === true){
          for(let i = 0; i < newEmp.length;  i++ ){
            let firstName = newEmp[i].empName.split(".")[0].toLowerCase();
            if(firstName.includes("-")){
              let splitP1 = firstName.split("-")[0].toLowerCase();
              let splitP2 = firstName.split("-")[1].toLowerCase();
              let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
              let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
              var empName = newEmp[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
            } else {
              let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
              var empName = newEmp[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
            }
            console.log(newEmp);
            if(newEmp[i].picData != ""){
              $(".slider-inner-new").append(`
                <li class="">
                  <div class="employee-info" id="${newEmp[i].empId}">
                    <img class="employee-image" src="data:image/png;base64, ${newEmp[i].picData}" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${newEmp[i].posName}</h5>
                    <p class="employee-department">${newEmp[i].depName}</p>
                  </div>
                </li>`);
            }else{
              if(newEmp[i].gender === "Эрэгтэй"){
                $(".slider-inner-new").append(`
                <li class="">
                  <div class="employee-info" id="${newEmp[i].empId}">
                    <img class="employee-image" src="./img/maleProfile.png" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${newEmp[i].posName}</h5>
                    <p class="employee-department">${newEmp[i].depName}</p>
                  </div>
                </li>`);
              } else {
                $(".slider-inner-new").append(`
                <li class="">
                  <div class="employee-info" id="${newEmp[i].empId}">
                    <img class="employee-image" src="./img/femaleProfile.png" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${newEmp[i].posName}</h5>
                    <p class="employee-department">${newEmp[i].depName}</p>
                  </div>
                </li>`);
              }
            }
            if(i==0) $(".slider-inner-new li").addClass('active');  
          }  
        } else {
          let firstName = newEmp.empName.split(".")[0].toLowerCase();
          if(firstName.includes("-")){
            let splitP1 = firstName.split("-")[0].toLowerCase();
            let splitP2 = firstName.split("-")[1].toLowerCase();
            let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
            let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
            var empName = newEmp.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
          } else {
            let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            var empName = newEmp.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
          }

          if(newEmp.picData != ""){
            $(".slider-inner-new").append(`
              <li class="">
                <div class="employee-info" id="${newEmp.empId}">
                  <img class="employee-image" src="data:image/png;base64, ${newEmp.picData}" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${newEmp.posName}</h5>
                  <p class="employee-department">${newEmp.depName}</p>
                </div>
              </li>`);
          }else{
            if(newEmp.gender === "Эрэгтэй"){
              $(".slider-inner-new").append(`
              <li class="">
                <div class="employee-info" id="${newEmp.empId}">
                  <img class="employee-image" src="./img/maleProfile.png" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${newEmp.posName}</h5>
                  <p class="employee-department">${newEmp.depName}</p>
                </div>
              </li>`);
            } else {
              $(".slider-inner-new").append(`
              <li class="">
                <div class="employee-info" id="${newEmp.empId}">
                  <img class="employee-image" src="./img/femaleProfile.png" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${newEmp.posName}</h5>
                  <p class="employee-department">${newEmp.depName}</p>
                </div>
              </li>`);
            }
          }
          $(".slider-inner-new li").addClass('active');  
        }
      },
      error: function(jqXhr, textStatus, errorMessage) {
          console.log("Шинэ ажилтны мэдээлэл авах дата сервертэй холбогдсонгүй");
      },
    });
    $.ajax("http://wso2app-test.xac0000.mn:80/services/getLeftEmployee", {
      type: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Source" : "KHBZ",
        "Function" : "getLeftEmployee",
        "UserId" : "tester",
        "RequestId" : "asd",
        "RequestType" : "R",
        "SecurityCode" : "862270BA75F64BA77CF44C3F16D161BC"
      },
      success: function(data,status,xhr) {
        let leftEmp = data.Response.Employee;
        if(Array.isArray(leftEmp) === true){
          for(let i = 0; i < leftEmp.length;  i++ ){
            let firstName = leftEmp[i].empName.split(".")[0].toLowerCase();
            if(firstName.includes("-")){
              let splitP1 = firstName.split("-")[0].toLowerCase();
              let splitP2 = firstName.split("-")[1].toLowerCase();
              let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
              let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
              var empName = leftEmp[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
            } else {
              let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
              var empName = leftEmp[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
            }
            
            console.log(leftEmp);
            if(leftEmp[i].picData != ""){
              $(".slider-inner-leftJob").append(`
                <li class="">
                  <div class="employee-info" id="${leftEmp[i].empId}">
                    <img class="employee-image" src="data:image/png;base64, ${leftEmp[i].picData}" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${leftEmp[i].posName}</h5>
                    <p class="employee-department">${leftEmp[i].depName}</p>
                  </div>
                </li>`);
            }else{
              if(leftEmp[i].gender === "Эрэгтэй"){
                $(".slider-inner-leftJob").append(`
                <li class="">
                  <div class="employee-info" id="${leftEmp[i].empId}">
                    <img class="employee-image" src="./img/maleProfile.png" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${leftEmp[i].posName}</h5>
                    <p class="employee-department">${leftEmp[i].depName}</p>
                  </div>
                </li>`);
              } else {
                $(".slider-inner-leftJob").append(`
                <li class="">
                  <div class="employee-info" id="${leftEmp[i].empId}">
                    <img class="employee-image" src="./img/femaleProfile.png" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${leftEmp[i].posName}</h5>
                    <p class="employee-department">${leftEmp[i].depName}</p>
                  </div>
                </li>`);
              }
            }
            if(i==0) $(".slider-inner-leftJob li").addClass('active');  
          }
        } else {
          let firstName = leftEmp.empName.split(".")[0].toLowerCase();
            if(firstName.includes("-")){
              let splitP1 = firstName.split("-")[0].toLowerCase();
              let splitP2 = firstName.split("-")[1].toLowerCase();
              let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
              let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
              var empName = leftEmp.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
            } else {
              let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
              var empName = leftEmp.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
            }

          if(leftEmp.picData != ""){
            $(".slider-inner-leftJob").append(`
              <li class="">
                <div class="employee-info" id="${leftEmp.empId}">
                  <img class="employee-image" src="data:image/png;base64, ${leftEmp.picData}" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${leftEmp.posName}</h5>
                  <p class="employee-department">${leftEmp.depName}</p>
                </div>
              </li>`);
          }else{
            if(leftEmp.gender === "Эрэгтэй"){
              $(".slider-inner-leftJob").append(`
              <li class="">
                <div class="employee-info" id="${leftEmp.empId}">
                  <img class="employee-image" src="./img/maleProfile.png" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${leftEmp.posName}</h5>
                  <p class="employee-department">${leftEmp.depName}</p>
                </div>
              </li>`);
            } else {
              $(".slider-inner-leftJob").append(`
              <li class="">
                <div class="employee-info" id="${leftEmp.empId}">
                  <img class="employee-image" src="./img/femaleProfile.png" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${leftEmp.posName}</h5>
                  <p class="employee-department">${leftEmp.depName}</p>
                </div>
              </li>`);
            }
          }
          $(".slider-inner-leftJob li").addClass('active');
        }
    },
    error: function(jqXhr, textStatus, errorMessage) {
        console.log("Ажлаас гарсан ажилчдыг харуулах дата сервертэй холбогдсонгүй");
    },
    });
    $.ajax("http://wso2app-test.xac0000.mn:80/services/greetEmployeeHB", {
      type: 'GET',
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Source" : "KHBZ",
        "Function" : "greetEmployeeHB",
        "UserId" : "tester",
        "RequestId" : "asd",
        "RequestType" : "R",
        "SecurityCode" : "5663A34FA6CB1065B9420B0A02AAF8A0"
      },
      success: function(data,status,xhr) {
        let hbEmp = data.Response.Employee;
        if(Array.isArray(hbEmp)===true){
          for(let i = 0; i < hbEmp.length;  i++ ){
            let firstName = hbEmp[i].empName.split(".")[0].toLowerCase();
            if(firstName.includes("-")){
              let splitP1 = firstName.split("-")[0].toLowerCase();
              let splitP2 = firstName.split("-")[1].toLowerCase();
              let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
              let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
              var empName = hbEmp[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
            } else {
              let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
              var empName = hbEmp[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
            }

            if(hbEmp[i].picData != ""){
              $(".slider-inner-birthday").append(`
                <li class="">
                  <div class="employee-info" id="${hbEmp[i].empId}">
                    <img class="employee-image" src="data:image/png;base64, ${hbEmp[i].picData}" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${hbEmp[i].posName}</h5>
                    <p class="employee-department">${hbEmp[i].depName}</p>
                  </div>
                </li>`);
            }else{
              if(hbEmp[i].gender === "Эрэгтэй"){
                $(".slider-inner-birthday").append(`
                <li class="">
                  <div class="employee-info" id="${hbEmp[i].empId}">
                    <img class="employee-image" src="./img/maleProfile.png" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${hbEmp[i].posName}</h5>
                    <p class="employee-department">${hbEmp[i].depName}</p>
                  </div>
                </li>`);
              } else {
                $(".slider-inner-birthday").append(`
                <li class="">
                  <div class="employee-info" id="${hbEmp[i].empId}">
                    <img class="employee-image" src="./img/femaleProfile.png" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${hbEmp[i].posName}</h5>
                    <p class="employee-department">${hbEmp[i].depName}</p>
                    </div>
                </li>`);
              }
            }
            if(i==0) $(".slider-inner-birthday li").addClass('active');  
          }
        } else {
          let firstName = hbEmp.empName.split(".")[0].toLowerCase();
          if(firstName.includes("-")){
            let splitP1 = firstName.split("-")[0].toLowerCase();
            let splitP2 = firstName.split("-")[1].toLowerCase();
            let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
            let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
            var empName = hbEmp.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
          } else {
            let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            var empName = hbEmp.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
          }

          if(hbEmp.picData != ""){
            $(".slider-inner-birthday").append(`
              <li class="">
                <div class="employee-info" id="${hbEmp.empId}">
                  <img class="employee-image" src="data:image/png;base64, ${hbEmp.picData}" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${hbEmp.posName}</h5>
                  <p class="employee-department">${hbEmp.depName}</p>
                </div>
              </li>`);
          }else{
            if(hbEmp.gender === "Эрэгтэй"){
              $(".slider-inner-birthday").append(`
              <li class="">
                <div class="employee-info" id="${hbEmp.empId}">
                  <img class="employee-image" src="./img/maleProfile.png" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${hbEmp.posName}</h5>
                  <p class="employee-department">${hbEmp.depName}</p>
                </div>
              </li>`);
            } else {
              $(".slider-inner-birthday").append(`
              <li class="">
                <div class="employee-info" id="${hbEmp.empId}">
                  <img class="employee-image" src="./img/femaleProfile.png" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${hbEmp.posName}</h5>
                  <p class="employee-department">${hbEmp.depName}</p>
                </div>
              </li>`);
            }
          }
          $(".slider-inner-birthday li").addClass('active');  
        }
    },
    error: function(jqXhr, textStatus, errorMessage) {
        console.log("Төрсөн өдөр нь болж буй ажилчдын мэдээлэл авах дата сервертэй холбогдсонгүй");
    },
  });
});