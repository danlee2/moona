import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Meteor.startup(() => {
  // code to run on server at startup
    
  Services = new Mongo.Collection('services');
    Agencies = new Mongo.Collection('agencies');
    AvailableServ = new Mongo.Collection('availableServ');
    
});


Template.checkin.events({
  'click #turnAway'(event, t) {
   // alert( "Turn Away Clicked");
      t.$("#turnModal").css("visibility","visible");
     t.$("#turnModal").css("display","block");
      t.$("#turnModal").css("position","relative");
      t.$("#turnModal").css("top","-30px");
  },
    'click #takeIn'(event, instance) {
    alert( "Take In Clicked");
        
  },  'click #yesTurn'(event, t) {
alert( "You are sure");
      t.$("#turnModal").css("visibility","hidden");
       t.$("#turnModal").css("display","none");
  },
    'click #noTurn'(event, t) {
    alert( "We will remove");
        t.$("#turnModal").css("visibility","hidden");
         t.$("#turnModal").css("display","none");
  },
    'click #checkSystem' (event,t){
        //alert(""+t.$("#fName").val());
        var fN = t.$("#fName").val();
        var lN = t.$("#lName").val();
        var nN = t.$("#nName").val();
        var dateob = t.$("#dob").val();
        if(dateob == ""){
            dateob = "1999-11-11";
        }
        console.log("type is "+(typeof dateob )+"dob is "+dateob);
        var gend = t.$("input[name=gender]:checked").val();
        var ssn2 = t.$("#ssn").val();
         var cons = t.$("input[name=consent]:checked").val();
        var ref = t.$("input[name=refer]:checked").val();
         var r1 = t.$("input[name=risk1]:checked").val();
        var r2 = t.$("input[name=risk2]:checked").val();
        var r3 = t.$("input[name=risk3]:checked").val();
        
         console.log("type is "+(typeof r1 )+" r1 is "+r1);
       Router.go('dashboard', {fName: fN, lName: lN,nName: nN, dob: dateob, gender: gend,ssn:ssn2,consent: cons, refer: ref, risk1: r1, risk2: r2, risk3: r3 }, {query: 'id=bar'});
    }
});


Template.dashboard.onRendered(function (){
   //Meteor.subscribe('availableServices');
   
   
    console.log(Session.get("fName"));
    
     Session.get("fName");
    Session.get("lName");
    Session.get("nName");
    Session.get("dob");
   var gender = Session.get("gender");
    Session.get("ssn");
    Session.get("consent");
    Session.get("refer");
   Session.get("risk1");
    Session.get("risk2");
    Session.get("risk3");
    var aServ;
    var length;
    console.log("A services "+JSON.stringify(AvailableServ.find()));
    if(gender=="male"){
       aServ = AvailableServ.find({male: true});
        console.log("is a male");
        console.log(JSON.stringify(aServ));
        console.log("Length is "+aServ.count())
      
       console.log("At zero index is "+aServ.fetch()[0]);
    }else if(gender=="female"){
      aServ =  AvailableServ.find({female: true});
    }else{
     aServ =  AvailableServ.find({trans: true});
    }
    length = aServ.count();
    var i = 0;
    while(i<length){
        var node = "<div class=\"agencyClass\" id=\"agency"+i+"\"> <p class=\"aName\"> "+aServ.fetch()[i].aName+" </p> </div> ";
        $("#leftDash").append(node);
        node = "<p> Capacity:  "+aServ.fetch()[i].capacity+"<br> Free Space: "+aServ.fetch()[i].free+"</p>";
        $("#agency"+i).append(node);
        i++;
    }
   // $("#leftDash").css("backgroundColor", "blue");
    //alert(JSON.stringify(params));
});



Router.map(function() {//Maps out all the routes
  //this.route('/dashboard', {path: '/dashboard'});
/*this.route('/dash/:itemName', {
    name: 'dashboard',
    data: function(){
        return {
            //item: Items.findOne(this.params.query.id),
            itemName: this.params.itemName
        };
    }
});*/
    
    this.route('dashboard', {
  // get parameter via this.params
  path: '/posts/:fName&:lName&:nName&:dob&:gender&:ssn&:consent&:refer&:risk1&risk2&:risk3'
,data: function(event,t){
        
       console.log(this.params.fName);
    console.log(this.params.lName);
    console.log(this.params.nName);
    console.log(this.params.dob);
     console.log(this.params.gender);
      console.log(this.params.ssn);
    console.log(this.params.consent);
    console.log(this.params.refer);
    //Save in session variables
    
    
    Session.set("fName", this.params.fName);
    Session.set("lName",this.params.lName);
    Session.set("nName", this.params.nName);
    Session.set("dob",this.params.dob);
    Session.set("gender", this.params.gender);
    Session.set("ssn",this.params.ssn);
    Session.set("consent", this.params.consent);
    Session.set("refer",this.params.refer);
   Session.set("risk1",this.params.risk1);
    Session.set("risk2", this.params.risk2);
    Session.set("risk3",this.params.risk3);

    //t.$("#leftDash").innerHtml = " "+this.params.fName;
}
    },{
        waitOn: function() {
        return [
            Meteor.subscribe('availableServices')
        ];
    }
    });
    /*this.route('/dashboard/:fN', function(){
              
              var params = this.params;
              var fN = params.fN;
              });*/
   this.route('/checkin', {path:'/'}); 
 
    
    this.route('test',{
        waitOn: function() {
       /* return [
            Meteor.subscribe('userinfoPub')
        ];*/
    }
    });
   
});