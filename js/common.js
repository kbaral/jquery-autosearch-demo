//CIS Service URL
var DevCISURL   = "https://wbgservicedev.worldbank.org";
var TestCISURL  = "https://wbgservicetst.worldbank.org";
var QACISURL    = "https://wbgserviceqa.worldbank.org";
var ProdCISURL  = "https://wbgservice.worldbank.org";


//Relogin URL- Redirects to authentication page if the user details are not found in the local session

var DevreloginURL   = "http://wbgmsspwfa001:8093";  
var TestreloginURL  = "https://biservicecatalogqa.worldbank.org"; 
var QAreloginURL    = "https://biservicecatalogqa.worldbank.org"; 
var ProdreloginURL  = "https://biservicecatalog.worldbank.org"; 


//BD Tool URL
var DevBDtoolURL  = "https://bidscdev.worldbank.org:9502/directory";
var TestBDtoolURL = "https://bidsctst.worldbank.org:9502/directory";
var QABDtoolURL   = "https://bidscqa.worldbank.org:9502/directory";
var ProdBDtoolURL = "https://bidsc.worldbank.org:9502/directory";


//Node URL
var Devnodeproxyurl  = "https://wbgauthservicedev.worldbank.org/BDProxyService";
var Testnodeproxyurl = "https://wbgauthservicetst.worldbank.org/BDProxyService";
var QAnodeproxyurl   = "https://wbgauthserviceqa.worldbank.org/BDProxyService";
var Prodnodeproxyurl = "https://wbgauthservice.worldbank.org/BDProxyService";



//Assign CIS Service URL per environment

//var hostcisurl = DevCISURL;
 
//var hostcisurl = TestCISURL;
 
//var hostcisurl = QACISURL;

var hostcisurl = ProdCISURL;


//Assign relogin URL per environment

//var reloginURL = DevreloginURL;

//var reloginURL = TestreloginURL;

//var reloginURL = QAreloginURL;

var reloginURL = ProdreloginURL;


//Assign BD Tool URL per environment

//var CIStoolURL   = DevBDtoolURL;

//var CIStoolURL = TestBDtoolURL;

//var CIStoolURL = QABDtoolURL; 

var CIStoolURL   = ProdBDtoolURL;

 
//Assign node proxy url  per environment

var nodeproxyurl = Devnodeproxyurl;

//var nodeproxyurl = Testnodeproxyurl;

//var nodeproxyurl = QAnodeproxyurl;

//var nodeproxyurl = Prodnodeproxyurl;

