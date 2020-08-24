function myFunction() {

//t1_とt0の内容をマージして昇順にソートしてt1に入れる関数

    t1_ = [0.0, 2.0, 5.0,13.0, 21.0, 31.0, 42.0] //ここ適当に決める
    t0 = [2,3,15, 18, 42] //ここ適当に決める
    t1_.push.apply(t1_, t0)
    t1_.sort(function(a, b){
      var a_nan = (a !== a);
      var b_nan = (b !== b);
      if (a_nan && b_nan) return 0;
      if (a_nan) return 1;
      if (b_nan) return -1;
      //ここまで来ればaもbもNaNの可能性はない
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
   Logger.log(t1_)
    var b1 = [];
    var t1 = [];
      for (var i = 0; i < t1_.length; i++){
      b1[i] = "***行"
      t1[i] = ( '00' + Number(t1_[i])).slice( -2 ) + "分待ち"
    }
   Logger.log(t1)   
}

