<template>
    <div id="citizen-info" class="citizen-info">
      <div class="portrait" id="portrait">
          <img class="portrait-img" :src="citizen.portrait" />
            <span class="corner top left"></span>
          <span class="corner top right"></span>
          <span class="corner bottom left"></span>
          <span class="corner bottom right"></span>
      </div>
      <div class="info">
          <div class="line-item"><div>UEE Citizen Record:</div><div>#{{ citizen.record }}</div></div>
          <div class="line-item"><div>Name:</div><div>{{citizen.name}}</div></div>
          <div class="line-item"><div>Handle:</div><div>{{citizen.handle}}</div></div>
          <div class="line-item"><div>Enlisted:</div><div>{{citizen.enlisted}}</div></div>
          <br>
          <div>
            Home:
          <ul>
              <li class="line-item"><div>System</div>-<div>{{citizen.home.system}}</div></li>
              <li class="line-item"><div>Planet</div>-<div>{{citizen.home.planet}}</div></li>
              <li class="line-item"><div>City:</div>-<div>{{citizen.home.city}}</div></li>
          </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>