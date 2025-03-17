---
layout: base
title: Student Home 
description: Home Page
hide: true
---
<script>
var n = localStorage.getItem('on_load_counter');

if (n === null) {
  n = 0;
}
n++;

localStorage.setItem("on_load_counter", n);

nums = n.toString().split('').map(Number);
document.getElementById('CounterVisitor').innerHTML = '';
for (var i of nums) {
  document.getElementById('CounterVisitor').innerHTML += '<span class="counter-item">' + i + '</span>';
}

</script>


<h1 align=center> Welcome to my page </h1>
 Hi there ! I am Rishabh Jha. <br/> 
 <p> Feel free to explore my website. You are the visitor number <div id="CounterVisitor"></div>  

