window.onload = function (){
  main.init();
  main.test();
}

var main = {
  'VueData': null,

  init: function () {
    this.VueData = new Vue(count.init());
  },

  test: function () {
    var target = 5;

    var countArray = [];

    var targetArray = [];
    var targetReverseArray = [];
    for (var i = 0; i < target; i++) {
      targetArray.push(i + 1);
      targetReverseArray.push(target - i);
    }

    targetArray.map(function (value, index) {
      var valueArray = [];
      for (var i = 0; i < value; i++) {
        valueArray.push(i + 1);
      }
      
      valueArray.reverse().map(function (val, key) {
        countArray.push(val);
      })
    });

    targetReverseArray.map(function (value, index) {
      var valueArray = [];
      for (var i = 0; i < value; i++) {
        valueArray.push(i);
      }
      
      valueArray.map(function (val, key) {
        countArray.push(val);
      })
    });

    return countArray;
  }
}

var count = {
  'Vue': {
    'el': '#main',

    'data': {
      'countSelect': null,
      'btnList': []
    },
    'watch': {
      countSelect: function (newSelect, oldSelect) {
        this.btnList = this.selectToList(parseInt(newSelect));
        this.saveToLocalStorage(parseInt(newSelect), this.btnList);
      }
    },
    
    'methods': {
      saveToLocalStorage: function (countSelect, btnList) {
        var newCount = JSON.stringify({
          'countSelect': countSelect,
          'btnList': btnList
        });
        
        localStorage.setItem('RejiejayCount', newCount);
      },

      selectToList: function (target) {
        target = parseInt(target);
    
        var countArray = [];
    
        var targetArray = [];
        var targetReverseArray = [];
        for (var i = 0; i < target; i++) {
          targetArray.push(i + 1);
          targetReverseArray.push(target - i);
        }
    
        targetArray.map(function (value, index) {
          var valueArray = [];
          for (var i = 0; i < value; i++) {
            valueArray.push(i + 1);
          }
          
          valueArray.reverse().map(function (val, key) {
            countArray.push(val);
          })
        });
    
        targetReverseArray.map(function (value, index) {
          var valueArray = [];
          for (var i = 0; i < value; i++) {
            valueArray.push(i);
          }
          
          valueArray.map(function (val, key) {
            countArray.push(val);
          })
        });
    
        return countArray.map(function (val, key) {
          return {
            'id': key, 
            'name': val, 
            'isSelect': false
          }
        });
      },

      select: function (id) {
        var newBtnList = this.btnList.concat([]).map(function (value, index) {
          value.isSelect = index === id ? true : false;
          return value
        });
        this.btnList = newBtnList
        
        this.saveToLocalStorage(parseInt(this.countSelect), newBtnList);
      }
    }
    
  },

  'btn': [
    {'id': 0, 'name': '2', 'isSelect': false},
    {'id': 1, 'name': '3', 'isSelect': false},
    {'id': 2, 'name': '4', 'isSelect': false},
    {'id': 3, 'name': '5', 'isSelect': false},
    {'id': 4, 'name': '6', 'isSelect': false}
  ],

  init: function () {
    var RejiejayCount = JSON.parse(localStorage.getItem('RejiejayCount'));
    var countSelect = RejiejayCount ? RejiejayCount.countSelect : 3;
    
    this.Vue.data.countSelect = RejiejayCount ? 
      RejiejayCount.countSelect : 3;

    this.Vue.data.btnList = RejiejayCount ? 
      RejiejayCount.btnList : 
      this.Vue.methods.selectToList(3);

    return this.Vue;
  }
}
