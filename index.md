---
layout: base
title: Welcome Page 
description: Home Page
hide: true
---



<h1 align=center> Welcome to my page </h1>
<br><br>
Hi there! I am Rishabh Jha. <br/> 
<p> Feel free to explore my website. Enjoy your time! </p>

<div style="background-color: #00FF00; color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold;" cursorshover="true">
            Snake Game
        </div>

 <div style="background-color: #FF0000; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;" cursorshover="true">
            Turtle v0.0
        </div>

 <div style="background-color: #FF8800; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;" cursorshover="true">
            Turtle v0.1
        </div>

 <div style="background-color: #FFFF00; color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold;" cursorshover="true">
            Turtle v0.2
        </div>

  <div style="background-color: #880088; color: black; padding: 10px 20px; border-radius: 5px; font-weight: bold;" cursorshover="true">
            Turtle v0.3
        </div>
  <div style="background-color: #12ABFF; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;" cursorshover="true">
            Message Box 0.1
        </div>
<!-- Add a button -->
<div align="center">
    <a href="/student_2025/about" style="text-decoration: none;">
        
            Learn More About Me
        </button>
    </a>
</div>

/* ==========================================================================
   BUTTONS
   ========================================================================== */

/*
   Default button
   ========================================================================== */

.btn {
  /* default */
  display: inline-block;
  margin-bottom: 0.25em;
  padding: 0.5em 1em;
  font-family: $sans-serif;
  font-size: $type-size-6;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border-width: 0;
  border-radius: $border-radius;
  cursor: pointer;

  .icon {
    margin-right: 0.5em;
  }

  .icon + .hidden {
    margin-left: -0.5em; /* override for hidden text*/
  }

  /* button colors */
  $buttoncolors:
  (primary, $primary-color),
  (inverse, #fff),
  (light-outline, transparent),
  (success, $success-color),
  (warning, $warning-color),
  (danger, $danger-color),
  (info, $info-color),
  (facebook, $facebook-color),
  (twitter, $twitter-color),
  (linkedin, $linkedin-color);

  @each $buttoncolor, $color in $buttoncolors {
    &--#{$buttoncolor} {
      @include yiq-contrasted($color);
      @if ($buttoncolor == inverse) {
        border: 1px solid $border-color;
      }
      @if ($buttoncolor == light-outline) {
        border: 1px solid #fff;
      }

      &:visited {
        @include yiq-contrasted($color);
      }

      &:hover {
        @include yiq-contrasted(mix(#000, $color, 20%));
      }
    }
  }

  /* fills width of parent container */
  &--block {
    display: block;
    width: 100%;

    + .btn--block {
      margin-top: 0.25em;
    }
  }

  /* disabled */
  &--disabled {
    pointer-events: none;
    cursor: not-allowed;
    filter: alpha(opacity=65);
    box-shadow: none;
    opacity: 0.65;
  }

  /* extra large button */
  &--x-large {
    font-size: $type-size-4;
  }

  /* large button */
  &--large {
    font-size: $type-size-5;
  }

  /* small button */
  &--small {
    font-size: $type-size-7;
  }
}

 
