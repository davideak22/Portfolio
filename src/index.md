---
layout: "base.njk"
title: CONTENT CREATOR
home: Home
blog: Blog
Project: Project
About me: About me
---



<div class="">


    <!-- Hero section-->
    <div class="flex items-center justify-center md:h-[700px] z-0">
      {% include "hero.njk" %}
    </div>
    <div class="-mt-10">
      {% include "scrollingtrust.njk" %}
    </div>
    <div>
      {% include "featuredhero.njk" %}
    </div>
    
    <div class="flex items-center justify-center">
      {% include "creative-tools.njk" %}
    </div>
    <div class="h-full">
      {% include "about-hero-section.njk" %}
    </div>
    <div class="h-full">
      {% include "faq.njk" %}
    </div>
    <div class="h-full">
      {% include "featuredblog.njk" %}
    </div>
</div>