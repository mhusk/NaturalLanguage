var apiKey = ScriptProperties.getProperty('apiKey');
var ss = SpreadsheetApp.getActiveSpreadsheet();
var reviewSheet = ss.getSheetByName('reviewData');
var sentimentSheet = ss.getSheetByName('sentimentData');

function retrieveEntitySentiment (line) {
 var apiEndpoint = 'https://language.googleapis.com/v1/documents:analyzeEntitySentiment?key=' + apiKey;
 // Create our json request, w/ text, language, type & encoding
  var nlData = {
   document: {
     language: 'en-us',
     type: 'PLAIN_TEXT',
     content: line
   },
   encodingType: 'UTF8'  };
 //  Package all of the options and the data together for the call
 var nlOptions = {
   method : 'post',
   contentType: 'application/json',
   payload : JSON.stringify(nlData)
 };
 //  And make the call
 var response = UrlFetchApp.fetch(apiEndpoint, nlOptions);
 return JSON.parse(response);
};
