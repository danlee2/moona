import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    
    Services = new Mongo.Collection('services');
    Agencies = new Mongo.Collection('agencies');
    AvailableServ = new Mongo.Collection('availableServ');
     ClientHistory = new Mongo.Collection('clientHistory');
 
    Agencies.insert({name: "St james", street: "Purdue Ave", city: "St. Louis", state: "MO", phone: "555-555-5555", capacity: 200, free: 100});
    Agencies.insert({name: "Jupiter center", street: "Purdue Ave", city: "St. Louis", state: "MO", phone: "555-555-5555", capacity: 200, free: 100});
Agencies.insert({name: "Worker Rehab", street: "Purdue Ave", city: "St. Louis", state: "MO", phone: "555-555-5555", capacity: 200, free: 100});
    
    
 
    Services.insert({name: "shelter", description: "keeping client safe"});
   Services.insert({name: "rehab", description: "getting rid of addictions"});
    Services.insert({name: "shelter for women", description: "warming women"});
   Services.insert({name: "rehab for men", description: "getting rid of addictions in men"});
    
    

    AvailableServ.insert({aName: "St james", aStreet: "Purdue Ave",sName: "shelter", ageUpBound: 60, ageDownBound: 20, male: true, female: true, trans: true});
      AvailableServ.insert({aName: "Jupiter center", aStreet: "Purdue Ave",sName: "shelter for women", ageUpBound: 60, ageDownBound: 6, male: false, female: true, trans: true});
     AvailableServ.insert({aName: "Worker Rehab", aStreet: "Purdue Ave",sName: "rehab for men", ageUpBound: 60, ageDownBound: 20, male: true, female: false, trans: false});
    
    
    
    ClientHistory.insert({fName: "Ted", lName: "Smith", dob: "1995-02-24",aName: "St james",aStreet: "Purdue Ave", checkInDate: "2016-02-24", checkOutDate: "2016-03-25"});
     ClientHistory.insert({fName: "Ted", lName: "Smith", dob: "1995-02-24",aName: "St james",aStreet: "Purdue Ave", checkInDate: "2016-03-28", checkOutDate: "2016-04-27"});
     ClientHistory.insert({fName: "Ted", lName: "Smith", dob: "1995-02-24",aName: "St james",aStreet: "Purdue Ave", checkInDate: "2016-05-02", checkOutDate: "2016-05-25"});
    
});

 Meteor.publish('availableServices', function () {
     // console.log("x is now"+Images.find().cursor);
    return AvailableServ;
  });

 Meteor.publish('agencies', function () {
     // console.log("x is now"+Images.find().cursor);
    return Agencies;
  });
 Meteor.publish('clientHist', function () {
     // console.log("x is now"+Images.find().cursor);
    return ClientHistory.find();
  });
