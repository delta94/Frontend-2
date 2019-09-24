import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';

import './landing.scss';
import { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus } from 'app/actions/user-campaign';
import { bindingLandingPage, landingSubmit } from 'app/actions/landing-page';

export interface ILandingProps extends StateProps, DispatchProps, RouteComponentProps<{ customerCode: string; idCampaign: string }> {
  script?: string;
  htmlContent: string;
}

export interface ILandingState {
  modal?: boolean;
  activeTab: string;
}

export class Landing extends React.Component<ILandingProps, ILandingState> {
  state: ILandingState = {
    modal: false,
    activeTab: '1'
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const customerCode = this.props.match.params.customerCode;
    const idCampaign = this.props.match.params.idCampaign;

    // call service get thong tin landing page o day
    this.props.bindingLandingPage(customerCode, idCampaign);
  }

  componentDidMount() {
    // load script xu ly form submit
    const script = document.createElement('script');

    script.innerHTML = this.props.script;

    script.innerHTML = `

    $(document).on("keypress", "#phone", function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
      }
      return true;
  });

    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }


    function showErrorElement(elementName,errorValue) {
      document.getElementsByName(elementName)[0].style.display = 'block';
      document.getElementsByName(elementName)[0].innerHTML= errorValue; 
      document.getElementsByName(elementName)[0].style.color = 'red';
    }
    
      function onSubmit() {
      
        var path = window.location.href;
        var arr = path.split("/");
        var campaign = arr[arr.indexOf("mgm")+ 1];
        var customer = arr[arr.indexOf("customer")+ 1];
      
        var successToRq = true;
        var valueName = document.getElementsByName('name')[0].value;
        var valueEmail = document.getElementsByName('email')[0].value;
        var valuePhone = document.getElementsByName('phone')[0].value;
      
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}/igm;
        var vnfont = /((09|03|07|08|05)+([0-9]{8})$)/g;
      
      document.getElementsByName('errorName')[0].style.display = 'none';
      document.getElementsByName('errorEmail')[0].style.display = 'none';
      document.getElementsByName('errorPhone')[0].style.display = 'none';
      
      if(valueName==="" || valueName===undefined){
      showErrorElement('errorName',"&nbsp;* Tên bắt buộc nhập");
      successToRq = false;
      } 
      if(valueEmail==="" || valueEmail===undefined){
      showErrorElement('errorEmail',"&nbsp;* Email bắt buộc nhập");
      successToRq = false;
      }	else if(!re.test(valueEmail)){
      showErrorElement('errorEmail',"&nbsp;&nbsp; Email không hợp lệ");
      successToRq = false;
      } 
      if(valuePhone==="" || valuePhone===undefined){
      showErrorElement('errorPhone',"&nbsp;* Số điện thoại bắt buộc nhập");
      successToRq = false;
      } else if(!vnfont.test(valuePhone)){
       showErrorElement('errorPhone',"&nbsp;&nbsp; Số điện thoại không hợp lệ");
       successToRq = false;
      }
        if(successToRq) {
          $("#btnSubmit").attr("disabled", "disabled");
          var xhttp = new XMLHttpRequest();      
              xhttp.open("POST", 'http://171.244.40.91:8088/v1/campaign/'+ campaign+'/customer/'+customer, true);
              xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              var postString = 'campaign=' + campaign + '&customer=' + customer + '&name=' + valueName
                        + '&email=' + valueEmail+ '&phone=' + valuePhone
              
        xhttp.onreadystatechange = function() {
          if(this.readyState == 4){
            if(this.status == 400){	
              var obj = JSON.parse(this.responseText);
              toastr.error(obj.message)
            } else if(this.status == 200){
              toastr.success(this.responseText);
            }
          }
          $("#btnSubmit").removeAttr("disabled");
              };		  
              xhttp.send(postString);
          }
      }
  `;
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    const landingContent = this.props.landingContent;

    return <div dangerouslySetInnerHTML={{ __html: landingContent }} />;
  }
}

const mapStateToProps = ({ userCampaign, landingPage }: IRootState) => ({
  camps: userCampaign.camps,
  loading: userCampaign.loading,
  total: userCampaign.total,
  totalActive: userCampaign.totalActive,
  totalFinish: userCampaign.totalFinish,
  totalNotActive: userCampaign.totalNotActive,
  landingContent: landingPage.landingContent
});

const mapDispatchToProps = { getCampaignInfoByStatus, getCampaignInfoById, getCountCampaignByStatus, bindingLandingPage, landingSubmit };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
