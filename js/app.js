var initialCats = [
    {
      clickCount : 0,
      name : 'Borgatron',
      imgSrc : 'img/sphynx_1.jpg',
      imgAttribution: 'https://imgur.com/gallery/BQs4d',
      level : '',
      nicnameArray : ['Lord of Borg, Ruler of Tron', 'Lordy B', 'B to tha T', 'cat']
    },
    {
      clickCount : 0,
      name : 'Aefulric',
      imgSrc : 'img/sphynx_2.jpg',
      imgAttribution : 'http://www.catloversdiary.com/about-the-sphynx-cat/',
      level : '',
      nicnameArray : ['A Train', 'Aizy', 'A Money', 'cat']
    },
    {
      clickCount : 0,
      name : 'Uhtred',
      imgSrc : 'img/sphynx_3.jpg',
      imgAttribution : 'http://www.catster.com/lifestyle/5-things-i-learned-sphynx-cats',
      level : '',
      nicnameArray : ['Saxon', 'Lord Uhtred', 'Plot Device', 'cat']
    },
    {
      clickCount : 0,
      name : 'Uhtred Son of Uhtred',
      imgSrc : 'img/sphynx_4.jpg',
      imgAttribution : 'http://moziru.com/sphynx-cat-clipart.html',
      level : '',
      nicnameArray : ['Born a Saxon, but raised by Danes', 'Anger Boi', 'Arsling', 'cat']
    },
    {
      clickCount : 0,
      name : 'Egil',
      imgSrc : 'img/sphynx_5.jpg',
      imgAttribution : 'http://purrfectcatbreeds.com/hairless-cat-breeds/',
      level : '',
      nicnameArray : ['Saga', 'Eeeeeeegil', 'Skallagrimson', 'cat']
    }
]

//establish view model and apply bindings here
var Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);
  this.level = ko.observable (data.level);
  this.nicnameArray = ko.observableArray(data.nicnameArray);

//assignLevel checks clickCount and returns level
  this.assignLevel = ko.computed(function() {
    if (this.clickCount() < 10) {
        return this.level('Newborn');
    } else if (this.clickCount() < 20) {
        return this.level('Adolescent');
    } else if (this.clickCount() < 30) {
        return this.level('Adult');
    } else if (this.clickCount() < 40) {
        return this.level('Geriatric');
    } else {
      return this.level('This cat bout to die...');
    }
  }, this);
}

var ViewModel = function() {
  var self = this;
//create cats and store in observable array
  this.catList = ko.observableArray([]);
//take data and make a new cat out of each object
//looping over all initialCats and pushing new cat with all items into catList
  initialCats.forEach(function(catItem){
    self.catList.push( new Cat(catItem) );
  });
//access the first cat
//b/c of "with" in html, the name, level, count are pulled from the correct cat
//which is set here
  this.currentCat = ko.observable( this.catList()[0] );

  this.incrementCounter = function() {
    //"this" represents viewmodel, there is no clickcount on viewmodel
    //(it now lives in cat) so add this.currentCat().clickCount
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  };
//knockout click supplies current model value as first parameter(so the name of the currentcat?)
  this.setCat = function(clickedCat) {
    //gives name to currentCat function, which "converts" name to index value of catList?
    //this way the page correctly renders cat's properties
    self.currentCat(clickedCat);
  };
};

ko.applyBindings(new ViewModel());

//attribution
//6 = https://www.iizcat.com/uploads/2017/06/bcfk2-grumpy-sphynx-cat-6.JPG
