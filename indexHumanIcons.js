function HumanIcons(domID, width, height) {
  if( !(this instanceof arguments.callee) ) {
    return new arguments.callee(arguments);
  }

  var paper = Raphael();
  var humanIcons;

  var self = this;

  self.init = function() {
    self.paper = Raphael('humanicons', width, height);
    self.humanPath = "M68.04,21.5c0,10.65-8.62,19.28-19.27,19.28c-10.64,0-19.27-8.63-19.27-19.28c0-10."
    +"64,8.63-19.27,19.27-19.27C59.42,2.23,68.04,10.86,68.04,21.5z“ + „M28,116h-0.22c0,0,0.02,"
    +"0.29,0.02,0.41c0,3.78-3.06,6.859-6.83,6.859s-6.83-3.09-6.83-6.869c0-0.12,0.02-0.4,0.02-0."
    +"4H14V74.76c1-9.99,6-18.76,14-24.45V116z" + "M83,116h-0.18c0,0,0.02,0.41,0.02,0.54c0,3.76-3."
    +"06,6.9-6.83,6.9c-3.77,0-6.83-3.181-6.83-6.95c0-0.13,0.011-0.49,0.021-0.49H69V50.54C77,56.23,82,65,83,74.99V116z" 
    +"M67.44,50H67v139.03c0,4.819-3.65,8.739-8.5,8.739c-4.84,0-8.5-3.92-8.5-8.739V124h-3v65.03c0,4.819-4.15,8.739-9,8."
    +"739c-4.84,0-9-3.92-9-8.739V49.52c6-3.61,12.2-5.47,19.21-5.47S62,46,67.44,50z";

    self.humanPath2 ="M34.837,11.467c0,5.228-4.23,9.463-9.459,9.463c-5.223,0-9.459-4."
    +"236-9.459-9.463c0-5.223,4.236-9.459,9.459-9.459C30.606,2.007,34.837,6.244,34.837,"
    +"11.467z“+“M15,58h0.074c0,0,0.01,0068,0.01,0.129c0,1.854-1.502,3.33-3.353,3.33c-1.85,"
    +"0-3.353-1.463-3.353-3.317c0-0.06,0.01-0.142,0.01-0.142H8V37.61c1-4.903,4-9.208,7-12."
    +"001V58z“+“M42,58h-0.399c0,0,0.011,0.129,0.011,0.191c0,1.846-1.502,3.352-3.354,3.352c-1."
    +"85,0-3.352-1.507-3.352-3.357c0-0.064,0.005-0.186,0.01-0.186H35V25.722c3,2.793,6,7.098,7,"
    +"12.001V58z“+“M34.543,25H34v68.702c0,2.366-1.619,4.289-4,4.289c-2.376,0-4-1.923-4-4."
    +"289V62h-2v31.702c0,2.366-1.619,4.289-4,4.289c-2.375,0-4-1.923-4-4.289V25.221c3-1.772,5."
    +"825-2.913,9.267-2.913S31.872,23,34.543,25z"
  //self.draw();
};

  self.drawHumanIcons = function (release, xOffset, yOffset, index) { //drawDotAndLabel

    humanIcons = self.paper.path(self.humanPath2);
    humanIcons.translate(xOffset, yOffset);
    humanIcons.scale(0.5); 
   if (index < 7) {
        humanIcons.attr({
      'stroke-width': 0,
      'fill':         '#ff0000',
      'fill-opacity':  1,
      'stroke': '#000000'
    });
   } else {
    humanIcons.attr({
      'stroke-width': 0,
      'fill':         '#cccccc',
      'fill-opacity':  1,
      'stroke': '#000000'
    });
}
};
self.init();
}


jQuery(function() {
  var div_width = $('#humanicons').width();
  humanicons = new HumanIcons('humanicons', 940, 900);

  for(i=0; i<20; i++){
    for(j=0; j< 20; j++){
      var human = humanicons.drawHumanIcons({},i*100,j*100,i*20+j);
    };
  };
});