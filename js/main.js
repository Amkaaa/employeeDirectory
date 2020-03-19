$(document).ready(function(){
    $("#drpDwn, #showSiteOne, #showSiteTwo, #showHelpText, .showOut, #showSiteResult2, .employee-directory").hide();
    $( "#tabs" ).tabs();
  
    $("a#ui-id-1.ui-tabs-anchor, a#ui-id-2.ui-tabs-anchor");

    $('.search-tab-container li').click(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })

    $('#showSite').click(function(){ 
        $('.showOut').hide();
        $('#' + $(this).val()).show();
    });   

    $( "#employee-search-angilal" ).change(function(){
        let angilal = $( "#employee-search-angilal" ).val();

        switch(+angilal) {
            case 0: $("#employee-simple-search").attr("placeholder", "Жишээ: Бат");
                    break;
            case 1: $("#employee-simple-search").attr("placeholder", "Жишээ: 99xxxxxx");
                    break;
            case 2: $("#employee-simple-search").attr("placeholder", "Жишээ: 123@example.com");
                    break;
            case 3: $("#employee-simple-search").attr("placeholder", "Жишээ: Програм хангамж");
                    break;
            case 4: $("#employee-simple-search").attr("placeholder", "Жишээ: Програм Хөгжүүлэгч");
                    break;
        };

    });

    $("#imgIcon").mouseover(function(){
        $("#imgIcon").attr("src", "./img/qMarkIcon-2.png");
        $("#imgIcon").css({"border": "1px solid #EA700D"});
        $("#showHelpText").fadeIn(500).css({"display" : "inline-block"});
    });

    $("#imgIcon").mouseout(function(){
        $("#imgIcon").attr("src", "./img/qMarkIcon.png");
        $("#imgIcon").css({"border": "1px solid #111"});
        $("#showHelpText").fadeOut(500);
    });
    
    $(document).on("click", '.siteOne-item a', function() {
      let str = $(this).text();
      $("#showSiteResult a").html($("#siteOne a").text());
      $("#showSiteResult2 a").html(str);
      $("#showSiteResult2").show();
      $(".employee-directory").show();
      $("#drpDwn").toggle();
      $("#showSiteTwo, #showSiteOne").hide();
      $(".employee-info-container").hide();
      $(".employee-aside-info").hide();
      $(".orgChart").hide();
      $(".query-result").empty();
      $(".employee-directory").css("width","95%");

      // departiig songohod dep ided ugsun id-g salgaj avaad querygeer orj irj bgaa emp dep idtai jishij uzne
      let clickedDepartId = $(this).attr("id").match(/\d+/);
      displayEmpInfo(clickedDepartId);
    });

    $(document).on("click", '.siteTwo-item a', function() {
      let str = $(this).text();
      $("#showSiteResult a").html($("#siteTwo a").text());
      $("#showSiteResult2 a").html(str);
      $("#showSiteTwo, #showSiteOne").hide();
      $("#showSiteResult2").show();
      $(".employee-directory").show();
      $("#drpDwn").toggle();
      $(".orgChart").hide();
      $(".employee-info-container").hide();
      $(".employee-aside-info").hide();
      $(".query-result").empty();

      let clickedDepartId = $(this).attr("id").match(/\d+/);
      displayEmpInfo(clickedDepartId);
    });

    function displayEmpInfo( clickedDepartId ){
      
      $(".query-result").empty();
      $(".query-result").append('<div class="loading-container"><div class="circle"></div><div class="circle"></div></div>');

      $.ajax('http://wso2app-test.xac0000.mn:80/services/getEmployee',{
        type: 'POST',
        headers: {
          "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/xml",
          "Source" : "KHBZ",
          "Function" : "getEmpInfo",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "1D37B0A394ABBA29FC3E5AD4F2DCDD56"
        },
        data: '<Request><depid>' + clickedDepartId + '</depid></Request>',
        dataType: "text",
        success: function(data,status,xhr) {
          console.log(data);
          var jsonConvert = JSON.parse(data);
          console.log(jsonConvert)
          $(".query-result").empty();
          if(jsonConvert.Response === null) {
            $(".query-result").append('<div class="isNotFound"><img src="./img/undraw_searching_p5ux.svg"><h1> Хайлтын үр дүн олдсонгүй </h1></div>');
          } else {
            var empData = jsonConvert.Response.Employee;
            if(Array.isArray(empData)){
              for(let i = 0; i < empData.length; i++){
                // Овог хойноо гарч ирж байгааг зассан. Нэрийн эхний үсгийг том болгосон
                let firstName = empData[i].empName.split(".")[0].toLowerCase();
                if(firstName.includes("-")){
                  let splitP1 = firstName.split("-")[0].toLowerCase();
                  let splitP2 = firstName.split("-")[1].toLowerCase();
                  let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                  let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
                } else {
                  let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                }

                if(empData[i].picData != ""){
                  $(".query-result").append(`<li id="${empData[i].empId}"><img src="data:image/png;base64, ${empData[i].picData}" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                } else {
                  if(empData[i].gender === "Эрэгтэй"){
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  } else {
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  }
                }
              };
            }else{
              let firstName = empData.empName.split(".")[0].toLowerCase();
              if(firstName.includes("-")){
                let splitP1 = firstName.split("-")[0].toLowerCase();
                let splitP2 = firstName.split("-")[1].toLowerCase();
                let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
              } else {
                let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
              }
              if(empData.picData != ""){
                $(".query-result").append(`<li id="${empData.empId}"><img src="data:image/png;base64, ${empData.picData}" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
              } else {  
                if(empData.gender === "Эрэгтэй"){
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
                } else {
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }
              }
            };
          }
        },
        error: function(jqXhr, textStatus, errorMessage) {
          console.log("Emp Show Өгөгдлийн сантай холбогдсонгүй");
        }     
      });
    }

    $("#simple-search").on("click", function() {
      let inputData = $("#employee-simple-search").val().toLowerCase();
      let optionSelection = $("#employee-search-angilal").val();
      
      if(inputData.length < 3){
        alert("Хайлтын урт 3-аас дээш тэмдэгт байхыг анхаарна уу.")
      } else {
        if(inputData != ""){
          $(".employee-info-container").hide();
          $(".employee-aside-info").hide();
          $(".orgChart").hide();
          if(optionSelection === "0"){
            displaySearchName(inputData);
          }else if(optionSelection === "1"){
            if(isNaN(inputData)){
              alert("Утасны дугаар оруулахыг анхаарна уу.");
            }else{
              displaySearchPhone(inputData);
            }
          }else if(optionSelection === "2"){
            displaySearchEmail(inputData);
          }else if(optionSelection === "3"){
            displaySearchDep(inputData);
          }else if(optionSelection === "4"){
            displaySearchPos(inputData);
          }
        }
      }
    });
    $("#employee-simple-search").keypress( function(e) {
      let inputData = $("#employee-simple-search").val().toLowerCase();
      let optionSelection = $("#employee-search-angilal").val();
      if(inputData != ""){
        let keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13'){ 
          if(inputData.length < 3){
            alert("Хайлтын урт 3-аас дээш тэмдэгт байхыг анхаарна уу.")
          } else {
            $(".employee-info-container").hide();
            $(".employee-aside-info").hide();
            $(".orgChart").hide();
            if(optionSelection === "0"){
              alert(inputData)
              displaySearchName(inputData);
            }else if(optionSelection === "1"){
              if(isNaN(inputData)){
                alert("Утасны дугаар оруулахыг анхаарна уу.");
              }else{
                displaySearchPhone(inputData);
              }
            }else if(optionSelection === "2"){
              displaySearchEmail(inputData);
            }else if(optionSelection === "3"){
              displaySearchDep(inputData);
            }else if(optionSelection === "4"){
              displaySearchPos(inputData);
            }
          }
        }
      }
    });
    function displaySearchName(inputData){
      $(".query-result").empty();
      $(".query-result").append(`<div class="loading-container"><div class="circle"></div><div class="circle"></div></div>`);

      $.ajax('http://wso2app-test.xac0000.mn:80/services/postEmpName',{
        type: 'POST',
        headers: {
          "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/xml",
          "Source" : "KHBZ",
          "Function" : "postEmpName",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "D6BE95DBCCCE60D2CB819CAA3F23A0AC"
          
        },
        data: '<Request><p_in_name>'+ inputData +'</p_in_name><p_in_status>Идэвхтэй</p_in_status><p_in_status2>Түр Эзгүй</p_in_status2></Request>',
        dataType: "text",
        success: function(data,status,xhr) {
          var jsonConvert = JSON.parse(data);
          $(".query-result").empty();
          if(jsonConvert.Response === null) {
            $(".query-result").append(`<div class="isNotFound"><img src="./img/undraw_searching_p5ux.svg"><h1> Хайлтын үр дүн олдсонгүй </h1></div>`);
          } else {
            var empData = jsonConvert.Response.Employee;
            if(Array.isArray(empData)){
              for(let i = 0; i < empData.length; i++){
                let firstName = empData[i].empName.split(".")[0].toLowerCase();
                if(firstName.includes("-")){
                  let splitP1 = firstName.split("-")[0].toLowerCase();
                  let splitP2 = firstName.split("-")[1].toLowerCase();
                  let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                  let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
                } else {
                  let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                }

                if(empData[i].picData != ""){
                  $(".query-result").append(`<li id="${empData[i].empId}"><img src="data:image/png;base64, ${empData[i].picData}" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }else{
                  if(empData[i].gender === "Эрэгтэй"){
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  } else {
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  }
                }
              };
            }else{
              let firstName = empData.empName.split(".")[0].toLowerCase();
              if(firstName.includes("-")){
                let splitP1 = firstName.split("-")[0].toLowerCase();
                let splitP2 = firstName.split("-")[1].toLowerCase();
                let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
              } else {
                let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
              }

              if(empData.picData != ""){
                $(".query-result").append(`<li id="${empData.empId}"><img src="data:image/png;base64, ${empData.picData}" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
              } else {  
                if(empData.gender === "Эрэгтэй"){
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
                } else {
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }
              }
            };
          }
        },
        error: function(jqXhr, textStatus, errorMessage) {
          console.log("Search Өгөгдлийн сантай холбогдсонгүй");
        }     
      });
    }
    function displaySearchPhone(inputData){
      $(".query-result").empty();
      $(".query-result").append(`<div class="loading-container"><div class="circle"></div><div class="circle"></div></div>`);

      $.ajax('http://wso2app-test.xac0000.mn:80/services/postEmpPhone',{
        type: 'POST',
        headers: {
          "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/xml",
          "Source" : "KHBZ",
          "Function" : "postEmpPhone",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "2FE1C02DA95E4B33A415F03582004879"
          
        },
        data: '<Request><p_in_phone>'+ inputData +'</p_in_phone><p_in_status>Идэвхтэй</p_in_status><p_in_status2>Түр Эзгүй</p_in_status2></Request>',
        dataType: "text",
        success: function(data,status,xhr) {
          var jsonConvert = JSON.parse(data);
          $(".query-result").empty();
          if(jsonConvert.Response === null) {
            $(".query-result").append(`<div class="isNotFound"><img src="./img/undraw_searching_p5ux.svg"><h1> Хайлтын үр дүн олдсонгүй </h1></div>`);
          } else {
            var empData = jsonConvert.Response.Employee;
            if(Array.isArray(empData)){
              for(let i = 0; i < empData.length; i++){
                let firstName = empData[i].empName.split(".")[0].toLowerCase();
                if(firstName.includes("-")){
                  let splitP1 = firstName.split("-")[0].toLowerCase();
                  let splitP2 = firstName.split("-")[1].toLowerCase();
                  let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                  let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
                } else {
                  let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                }

                if(empData[i].picData != ""){
                  $(".query-result").append(`<li id="${empData[i].empId}"><img src="data:image/png;base64, ${empData[i].picData}" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }else{
                  if(empData[i].gender === "Эрэгтэй"){
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  } else {
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  }
                }
              };
            }else{
              let firstName = empData.empName.split(".")[0].toLowerCase();
              if(firstName.includes("-")){
                let splitP1 = firstName.split("-")[0].toLowerCase();
                let splitP2 = firstName.split("-")[1].toLowerCase();
                let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
              } else {
                let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
              }

              if(empData.picData != ""){
                $(".query-result").append(`<li id="${empData.empId}"><img src="data:image/png;base64, ${empData.picData}" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
              } else {  
                if(empData.gender === "Эрэгтэй"){
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
                } else {
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }
              }
            };
          }
        },
        error: function(jqXhr, textStatus, errorMessage) {
          console.log("Search Өгөгдлийн сантай холбогдсонгүй");
          console.log(errorMessage);
        }     
      });
    }
    function displaySearchEmail(inputData){
      $(".query-result").empty();
      $(".query-result").append(`<div class="loading-container"><div class="circle"></div><div class="circle"></div></div>`);

      $.ajax('http://wso2app-test.xac0000.mn:80/services/postEmpEmail',{
        type: 'POST',
        headers: {
          "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/xml",
          "Source" : "KHBZ",
          "Function" : "postEmpEmail",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "3763F2C76D8F7D7C3C63F1C1B5A26E09"
          
        },
        data: '<Request><p_in_email>'+ inputData +'</p_in_email><p_in_status>Идэвхтэй</p_in_status><p_in_status2>Түр Эзгүй</p_in_status2></Request>',
        dataType: "text",
        success: function(data,status,xhr) {
          var jsonConvert = JSON.parse(data);
          $(".query-result").empty();
          if(jsonConvert.Response === null) {
            $(".query-result").append(`<div class="isNotFound"><img src="./img/undraw_searching_p5ux.svg"><h1> Хайлтын үр дүн олдсонгүй </h1></div>`);
          } else {
            var empData = jsonConvert.Response.Employee;
            if(Array.isArray(empData)){
              for(let i = 0; i < empData.length; i++){
                let firstName = empData[i].empName.split(".")[0].toLowerCase();
                if(firstName.includes("-")){
                  let splitP1 = firstName.split("-")[0].toLowerCase();
                  let splitP2 = firstName.split("-")[1].toLowerCase();
                  let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                  let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
                } else {
                  let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                }
                if(empData[i].picData != ""){
                  $(".query-result").append(`<li id="${empData[i].empId}"><img src="data:image/png;base64, ${empData[i].picData}" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }else{
                  if(empData[i].gender === "Эрэгтэй"){
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  } else {
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  }
                }
              };
            }else{
              let firstName = empData.empName.split(".")[0].toLowerCase();
              if(firstName.includes("-")){
                let splitP1 = firstName.split("-")[0].toLowerCase();
                let splitP2 = firstName.split("-")[1].toLowerCase();
                let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
              } else {
                let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
              }

              if(empData.picData != ""){
                $(".query-result").append(`<li id="${empData.empId}"><img src="data:image/png;base64, ${empData.picData}" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
              } else {  
                if(empData.gender === "Эрэгтэй"){
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
                } else {
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }
              }
            };
          }
        },
        error: function(jqXhr, textStatus, errorMessage) {
          console.log("Search Өгөгдлийн сантай холбогдсонгүй");
        }     
      });
    }
    function displaySearchDep(inputData){
      $(".query-result").empty();
      $(".query-result").append(`<div class="loading-container"><div class="circle"></div><div class="circle"></div></div>`);

      $.ajax('http://wso2app-test.xac0000.mn:80/services/postEmpDep',{
        type: 'POST',
        headers: {
          "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/xml",
          "Source" : "KHBZ",
          "Function" : "postEmpDep",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "A349B3E8A2EACD6D204B981894E518A5"
          
        },
        data: '<Request><p_in_dname>'+ inputData +'</p_in_dname><p_in_status>Идэвхтэй</p_in_status><p_in_status2>Түр Эзгүй</p_in_status2></Request>',
        dataType: "text",
        success: function(data,status,xhr) {
          var jsonConvert = JSON.parse(data);
          $(".query-result").empty();
          if(jsonConvert.Response === null) {
            $(".query-result").append(`<div class="isNotFound"><img src="./img/undraw_searching_p5ux.svg"><h1> Хайлтын үр дүн олдсонгүй </h1></div>`);
          } else {
            var empData = jsonConvert.Response.Employee;
            if(Array.isArray(empData)){
              for(let i = 0; i < empData.length; i++){
                let firstName = empData[i].empName.split(".")[0].toLowerCase();
                if(firstName.includes("-")){
                  let splitP1 = firstName.split("-")[0].toLowerCase();
                  let splitP2 = firstName.split("-")[1].toLowerCase();
                  let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                  let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
                } else {
                  let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                }

                if(empData[i].picData != ""){
                  $(".query-result").append(`<li id="${empData[i].empId}"><img src="data:image/png;base64, ${empData[i].picData}" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }else{
                  if(empData[i].gender === "Эрэгтэй"){
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  } else {
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  }
                }
              };
            }else{
              let firstName = empData.empName.split(".")[0].toLowerCase();
              if(firstName.includes("-")){
                let splitP1 = firstName.split("-")[0].toLowerCase();
                let splitP2 = firstName.split("-")[1].toLowerCase();
                let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
              } else {
                let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
              }

              if(empData.picData != ""){
                $(".query-result").append(`<li id="${empData.empId}"><img src="data:image/png;base64, ${empData.picData}" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
              } else {  
                if(empData.gender === "Эрэгтэй"){
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
                } else {
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }
              }
            };
          }
        },
        error: function(jqXhr, textStatus, errorMessage) {
          console.log("Search Өгөгдлийн сантай холбогдсонгүй");
        }     
      });
    }
    function displaySearchPos(inputData){
      $(".query-result").empty();
      $(".query-result").append(`<div class="loading-container"><div class="circle"></div><div class="circle"></div></div>`);

      $.ajax('http://wso2app-test.xac0000.mn:80/services/postEmpPos',{
        type: 'POST',
        headers: {
          "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/xml",
          "Source" : "KHBZ",
          "Function" : "postEmpPos",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "0E126F7C9C88F108A76B8589FEEDE8F7"
        },
        data: '<Request><p_in_pname>'+ inputData +'</p_in_pname><p_in_status>Идэвхтэй</p_in_status><p_in_status2>Түр Эзгүй</p_in_status2></Request>',
        dataType: "text",
        success: function(data,status,xhr) {
          var jsonConvert = JSON.parse(data);
          $(".query-result").empty();
          if(jsonConvert.Response === null) {
            $(".query-result").append(`<div class="isNotFound"><img src="./img/undraw_searching_p5ux.svg"><h1> Хайлтын үр дүн олдсонгүй </h1></div>`);
          } else {
            var empData = jsonConvert.Response.Employee;
            if(Array.isArray(empData)){
              for(let i = 0; i < empData.length; i++){
                let firstName = empData[i].empName.split(".")[0].toLowerCase();
                if(firstName.includes("-")){
                  let splitP1 = firstName.split("-")[0].toLowerCase();
                  let splitP2 = firstName.split("-")[1].toLowerCase();
                  let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                  let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
                } else {
                  let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                  var empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                }

                if(empData[i].picData != ""){
                  $(".query-result").append(`<li id="${empData[i].empId}"><img src="data:image/png;base64, ${empData[i].picData}" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }else{
                  if(empData[i].gender === "Эрэгтэй"){
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  } else {
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  }
                }
              };
            }else{
              let firstName = empData.empName.split(".")[0].toLowerCase();
                if(firstName.includes("-")){
                  let splitP1 = firstName.split("-")[0].toLowerCase();
                  let splitP2 = firstName.split("-")[1].toLowerCase();
                  let splitP1Capitalized = splitP1.charAt(0).toUpperCase() + splitP1.slice(1);
                  let splitP2Capitalized = splitP2.charAt(0).toUpperCase() + splitP2.slice(1);
                  var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + splitP1Capitalized + "-" + splitP2Capitalized;
                } else {
                  let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                  var empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                }

              if(empData.picData != ""){
                $(".query-result").append(`<li id="${empData.empId}"><img src="data:image/png;base64, ${empData.picData}" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
              } else {  
                if(empData.gender === "Эрэгтэй"){
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
                } else {
                  $(".query-result").append(`<li id="${empData.empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }
              }
            };
          }
        },
        error: function(jqXhr, textStatus, errorMessage) {
          console.log("Search Өгөгдлийн сантай холбогдсонгүй");
        }     
      });
    }

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
        if(newEmp == null) {
          $(".employee-new-slideShow").closest(".employee-aside-info").hide();
        }
        console.log(newEmp);
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
              $(".slider-inner-new").append(`<li class=""><div class="employee-info" id="${newEmp[i].empId}"><img class="employee-image" src="data:image/png;base64, ${newEmp[i].picData}" alt="Ажилтан"><h4 class="employee-name">${empName}</h4><h5 class="employee-job-title">${newEmp[i].posName}</h5><p class="employee-department">${newEmp[i].depName}</p>
                  </div>
                </li>`);
            }else{
              if(newEmp[i].gender === "Эрэгтэй"){
                $(".slider-inner-new").append(`
                <li class="">
                  <div class="employee-info" id="${newEmp[i].empId}">
                    <img class="employee-image" src="/EmployeeDirectoryOfXacBank/img/maleProfile.png" alt="Ажилтан">
                    <h4 class="employee-name">${empName}</h4>
                    <h5 class="employee-job-title">${newEmp[i].posName}</h5>
                    <p class="employee-department">${newEmp[i].depName}</p>
                  </div>
                </li>`);
              } else {
                $(".slider-inner-new").append(`
                <li class="">
                  <div class="employee-info" id="${newEmp[i].empId}">
                    <img class="employee-image" src="/EmployeeDirectoryOfXacBank/img/femaleProfile.png" alt="Ажилтан">
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
                  <img class="employee-image" src="/EmployeeDirectoryOfXacBank/img/maleProfile.png" alt="Ажилтан">
                  <h4 class="employee-name">${empName}</h4>
                  <h5 class="employee-job-title">${newEmp.posName}</h5>
                  <p class="employee-department">${newEmp.depName}</p>
                </div>
              </li>`);
            } else {
              $(".slider-inner-new").append(`
              <li class="">
                <div class="employee-info" id="${newEmp.empId}">
                  <img class="employee-image" src="/EmployeeDirectoryOfXacBank/img/femaleProfile.png" alt="Ажилтан">
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

    $("#advanced-search").on("click", function() {
      let inputData = $("#employee-advanced-search").val().toLowerCase();
      console.log("Button clicked");
      
      if(inputData.length<3){
        alert("Хайлтын урт 3-аас дээш тэмдэгт байхыг анхаарна уу.")
      }else{
        if(inputData != ""){
          displaySearchAll(inputData);
            $(".employee-aside-info").hide();
            $(".employee-info-container").hide();
          $(".orgChart").hide();
        }
      }
      
    });

    $("#employee-advanced-search").keypress( function(e) {
      let inputData = $("#employee-advanced-search").val().toLowerCase();
      if(inputData != ""){
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(keycode == '13'){ 
          if(inputData.length<3){
            alert("Хайлтын урт 3-аас дээш тэмдэгт байхыг анхаарна уу.");
          }else{
            $(".employee-aside-info").hide();
            $(".employee-info-container").hide();
            $(".orgChart").hide();
            displaySearchAll(inputData);
          }
        }
      }
    });

    function displaySearchAll( inputData ){
      $(".query-result").empty();
      $(".query-result").append(`<div class="loading-container">
                                    <div class="circle"></div>
                                    <div class="circle"></div>
                                  </div>`);
    
      $.ajax('http://wso2app-test.xac0000.mn/services/getSP_SearchEmployeeByAll',{
        type: 'POST',
        crossDomain: true,
        headers: {
          "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
          "Content-Type": "application/xml",
          "Source" : "KHBZ",
          "Function" : "getSP_SearchEmployeeByAll",
          "UserId" : "tester",
          "RequestId" : "asd",
          "RequestType" : "R",
          "SecurityCode" : "1BCF6ED189534B5D64A3C9124776EB73"
        },
        data: '<Request><p_in_all>'+ inputData +'</p_in_all><p_in_status>Идэвхтэй</p_in_status><p_in_status2>Түр Эзгүй</p_in_status2></Request>',
        dataType: "text",
        success: function(data,status,xhr) {
          var jsonConvert = JSON.parse(data);
          console.log(jsonConvert);
          $(".query-result").empty();
          if(jsonConvert.Response === null) {
            $(".query-result").append(`<div class="isNotFound"><img src="./img/undraw_searching_p5ux.svg"><h1> Хайлтын үр дүн олдсонгүй </h1></div>`);
          } else {
            var empData = jsonConvert.Response.Employee;
            if(Array.isArray(empData)){
              for(let i = 0; i < empData.length; i++){
                let firstName = empData[i].empName.split(".")[0].toLowerCase();
                let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
                let empName = empData[i].empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
                if(empData[i].picData != ""){
                  $(".query-result").append(`<li id="${empData[i].empId}"><img src="data:image/png;base64, ${empData[i].picData}" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                }else{
                  if(empData[i].gender === "Эрэгтэй"){
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  } else {
                    $(".query-result").append(`<li id="${empData[i].empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData[i].posName}</h3><h4>${empData[i].depName}</h4></li>`);
                  }
                }  
              };
            }else{
              let firstName = empData.empName.split(".")[0].toLowerCase();
              let firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
              let empName = empData.empName.split(".")[1].charAt(0).toUpperCase() + ". " + firstNameCapitalized;
              if(empData.gender === "Эрэгтэй"){
                $(".query-result").append(`<li id="${empData.empId}"><img src="./img/maleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData.depName}</h4></li>`);
              } else {
                $(".query-result").append(`<li id="${empData.empId}"><img src="./img/femaleProfile.png" alt="employee"><h2>${empName}</h2><h3>${empData.posName}</h3><h4>${empData[i].depName}</h4></li>`);
              }
            };
          }
        },
        error: function(jqXhr, textStatus, errorMessage) {
          console.log("Search Өгөгдлийн сантай холбогдсонгүй");
        }     
      });
    }

    $(".orgChart img").on("click", function(){
      $(".orgChart img").css("transform", "scale(1.3)");
      $(".orgChart img").css("transition", "ease-in 0.5s");
      $(".orgChart img").css("z-index", "");
      $("#blur").addClass("active");
    })

    $(".orgChart img").on("mouseout", function(){
      $(".orgChart img").css("transform", "");
      $(".orgChart img").css("z-index", "");
      $("#blur").removeClass("active");
    })

    
    $("#showSiteResult").on("click", function(){
      $("#showSiteResult2").hide();
      $("#drpDwn").toggle();
    });

    $("#siteOne").on("click", function(){
      $("#showSiteOne").toggle();
    });

    $("#siteTwo").on("click", function(){
      $("#showSiteTwo").toggle();
    });

    $(".arrow-next").mouseover(function(){
      $(this).attr("src", "./img/arrowIcon-2.png");
    });

    $(".arrow-next").mouseout(function(){
      $(this).attr("src", "./img/arrowIcon.png");
    });

    $(".arrow-prev").mouseover(function(){
      $(this).attr("src", "./img/arrowIcon-2.png");
    });

    $(".arrow-prev").mouseout(function(){
      $(this).attr("src", "./img/arrowIcon.png");
    });

    $('.employee-new-slideShow .arrow-next').on('click', function(){
      let currentProfile = $('.slider-inner-new .active');
      let nextProfile = currentProfile.next();
      // $(".slider-inner-new .active").css("animation", "animateSlideRight ease-in-out 0.5s");
  
      if(nextProfile.length){
        currentProfile.removeClass('active');
        nextProfile.addClass('active');
        // $(".slider-inner-new .active").css("transform", "translateX(0px)");
      }else{
          currentProfile.removeClass('active');
          $(".slider-inner-new li").first().addClass('active');
      }
    });
    
      $('.employee-new-slideShow .arrow-prev').on('click', function(){
        let currentProfile = $('.slider-inner-new .active');
        let prevProfile = currentProfile.prev();
        // $(".slider-inner-new .active").css("animation", "animateSlideLeft ease-in-out 0.5s");
    
        if(prevProfile.length){
          currentProfile.removeClass('active');
          prevProfile.addClass('active');
        } else {
            currentProfile.removeClass('active');
            $(".slider-inner-new li").last().addClass('active');
        }
      });

      $('.employee-leftJob-slideShow .arrow-next').on('click', function(){
        let currentProfile = $('.slider-inner-leftJob .active');
        let nextProfile = currentProfile.next();
    
        if(nextProfile.length){
          currentProfile.removeClass('active');
          nextProfile.addClass('active');
        }else{
            currentProfile.removeClass('active');
            $(".slider-inner-leftJob li").first().addClass('active');
        }
      });
    
      $('.employee-leftJob-slideShow .arrow-prev').on('click', function(){
        let currentProfile = $('.slider-inner-leftJob .active');
        let prevProfile = currentProfile.prev();
        if(prevProfile.length){
          currentProfile.removeClass('active');
          prevProfile.addClass('active');
        } else {
            currentProfile.removeClass('active');
            $(".slider-inner-leftJob li").last().addClass('active');
        }
      });

      $('.employee-birthday-slideShow .arrow-next').on('click', function(){
        let currentProfile = $('.slider-inner-birthday .active');
        let nextProfile = currentProfile.next();
    
        if(nextProfile.length){
          currentProfile.removeClass('active');
          nextProfile.addClass('active');
        }else{
            currentProfile.removeClass('active');
            $(".slider-inner-birthday li").first().addClass('active');
        }
      });
    
      $('.employee-birthday-slideShow .arrow-prev').on('click', function(){
        let currentProfile = $('.slider-inner-birthday .active');
        let prevProfile = currentProfile.prev();
    
        if(prevProfile.length){
          currentProfile.removeClass('active');
          prevProfile.addClass('active');
        } else {
            currentProfile.removeClass('active');
            $(".slider-inner-birthday li").last().addClass('active');
        }
      });

      var passiveSlide = function passiveSlide(){
        let currentP1 = $('.slider-inner-birthday .active');
        let nextP1 = currentP1.next();
    
        if(nextP1.length){
          currentP1.removeClass('active');
          nextP1.addClass('active');
        }else{
            currentP1.removeClass('active');
            $(".slider-inner-birthday li").first().addClass('active');
        };

        let currentP2 = $('.slider-inner-leftJob .active');
        let nextP2 = currentP2.next();
    
        if(nextP2.length){
          currentP2.removeClass('active');
          nextP2.addClass('active');
        }else{
            currentP2.removeClass('active');
            $(".slider-inner-leftJob li").first().addClass('active');
        }
        
        let currentP3 = $('.slider-inner-new .active');
        let nextP3 = currentP3.next();
    
        if(nextP3.length){
          currentP3.removeClass('active');
          nextP3.addClass('active');
        }else{
            currentP3.removeClass('active');
            $(".slider-inner-new li").first().addClass('active');
        }
      };

      setInterval(passiveSlide , 10000);

      // Шинэ ажилтанд дарах модал
      $(document).on("click", '.employee-image', function(){

        let employeeId = $(this).closest(".employee-info").attr("id").match(/\d+/);
        console.log("Say darsan id: " + employeeId)

          $("#employeePopUp").find(".employeeInfo .employeeImage").attr("src", $(this).closest("li").find("img").attr("src"));
          $("#employeePopUp").find(".employeeInfo .employee-name").html($(this).closest("li").find(".employee-info .employee-name").text());
          $("#employeePopUp").find(".employeeInfo .employee-job-title").html($(this).closest("li").find(".employee-job-title").text());
          $("#employeePopUp").find(".employeeInfo .employee-department").html($(this).closest("li").find(".employee-department").text());

          $.ajax('http://wso2app-test.xac0000.mn:80/services/getEmpInfoForModal',{
            type: 'POST',
            crossDomain: true,
            headers: {
              "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
              "Content-Type": "application/xml",
              "Source" : "KHBZ",
              "Function" : "getEmpInfoForModal",
              "UserId" : "tester",
              "RequestId" : "asd",
              "RequestType" : "R",
              "SecurityCode" : "A132C1E7EB9535A49BC984BC890A5FDA"
            },
            data: '<Request><empid>'+ employeeId +'</empid></Request>',
            dataType: "text",
            success: function(data,status,xhr) {
              console.log(data)
              console.log(JSON.parse(data))
              var jsonConvert = JSON.parse(data);
              var empData = jsonConvert.Response.Employee;
              if(empData.status === 'Идэвхтэй'){
                $("#employeePopUp .employeeInfo .employee-email").html(empData.email);
                $("#employeePopUp .employeeInfo .employee-phone").html(empData.mobilePhone);
                $("#employeePopUp .employeeInfo .employee-status-indicator").html("Идэвхтэй").css("color", "green");
                $("#employeePopUp .employeeInfo .employee-work-year-indicator").html(empData.groupWorkedYear);

              } else if(empData.status === 'Түр Эзгүй'){
                $("#employeePopUp .employeeInfo .employee-email").html(empData.email);
                $("#employeePopUp .employeeInfo .employee-phone").html(empData.mobilePhone);
                $("#employeePopUp .employeeInfo .employee-status-indicator").html("Түр Эзгүй").css("color", "grey");
                $("#employeePopUp .employeeInfo .employee-work-year-indicator").html(empData.groupWorkedYear);
              } else {
                $("#employeePopUp .employeeInfo .employee-email").html(empData.email);
                $("#employeePopUp .employeeInfo .employee-phone").html(empData.mobilePhone);
                $("#employeePopUp .employeeInfo .employee-status-indicator").html("Ажлаас гарсан").css("color", "red");
                $("#employeePopUp .employeeInfo .employee-work-year-indicator").html(empData.groupWorkedYear);
              }

            },
            error: function(jqXhr, textStatus, errorMessage) {
              console.log("error with connecting data server ../getEmpInfoForModa");
            }     
          });

        $("#blur, #employeePopUp, .employee-main-container, nav").addClass("active");
      });

      $(document).on("click", '.query-result li img', function(){

        let employeeId = $(this).closest("li").attr("id").match(/\d+/);

        $("#employeePopUp").find(".employeeInfo .employeeImage").attr("src", $(this).closest("li").find("img").attr("src"));
        $("#employeePopUp").find(".employeeInfo .employee-name").html($(this).closest("li").find("h2").text());
        $("#employeePopUp").find(".employeeInfo .employee-job-title").html($(this).closest("li").find("h3").text());
        $("#employeePopUp").find(".employeeInfo .employee-department").html($(this).closest("li").find("h4").text());

        $.ajax('http://wso2app-test.xac0000.mn:80/services/getEmpInfoForModal',{
            type: 'POST',
            crossDomain: true,
            headers: {
              "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
              "Content-Type": "application/xml",
              "Source" : "KHBZ",
              "Function" : "getEmpInfoForModal",
              "UserId" : "tester",
              "RequestId" : "asd",
              "RequestType" : "R",
              "SecurityCode" : "A132C1E7EB9535A49BC984BC890A5FDA"
            },
            data: '<Request><empid>'+ employeeId +'</empid></Request>',
            dataType: "text",
            success: function(data,status,xhr) {
              console.log(data)
              console.log(JSON.parse(data))
              var jsonConvert = JSON.parse(data);
              var empData = jsonConvert.Response.Employee;
              if(empData.status === 'Идэвхтэй'){
                $("#employeePopUp .employeeInfo .employee-email").html(empData.email);
                $("#employeePopUp .employeeInfo .employee-phone").html(empData.mobilePhone);
                $("#employeePopUp .employeeInfo .employee-status-indicator").html("Идэвхтэй").css("color", "green");
                $("#employeePopUp .employeeInfo .employee-work-year-indicator").html(empData.groupWorkedYear);

              } else {
                $("#employeePopUp .employeeInfo .employee-email").html(empData.email);
                $("#employeePopUp .employeeInfo .employee-phone").html(empData.mobilePhone);
                $("#employeePopUp .employeeInfo .employee-status-indicator").html("Түр Эзгүй").css("color", "grey");
                $("#employeePopUp .employeeInfo .employee-work-year-indicator").html(empData.groupWorkedYear);
              } 

            },
            error: function(jqXhr, textStatus, errorMessage) {
              console.log("error with connecting data server ../getEmpInfoForModa");
            }     
          });

      $("#blur, #employeePopUp, .employee-main-container, nav").addClass("active");
    });

      $("#employeePopClose").on("click", function(){
        $("#blur, #employeePopUp, nav, .employee-main-container").removeClass("active");
      });

      // prevent scrolling while open modal    
      
      // filtering name
      $("#filterName").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".query-result li").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

/*       $("#filterName").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".query-result li").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      }); */

});