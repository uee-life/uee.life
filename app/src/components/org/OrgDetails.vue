<template>
  <div id="org-details" class="org-details">
    <div class="info">
        <div class="line-item"><div>Name:</div><div>{{org.name}}</div></div>
        <br>
        <div>
          Headquarters:
          <ul>
            <li class="line-item"><div>System</div>-<div>Unknown</div></li>
            <li class="line-item"><div>Planet</div>-<div>Unknown</div></li>
            <li class="line-item"><div>City:</div>-<div>Unknwown</div></li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'org-details',
  props: ['org']
}
</script>

<style scoped>
    .org-details {
      position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 250px;
    }
    .org-logo{
        width: 136px;
        height: 136px;
        margin-right: 20px;
        position: relative;
        opacity: 0;
    }

    .org-banner {
      position: relative;
      width: 100%;
      padding-bottom: 67px;
      border: 1px solid grey;
    }

    .org-banner .banner-img {
      opacity: 0.8 !important;
      border-bottom: 1px dashed grey;
      display: block;
      height: 250px;
      background-size: cover;
      background-position: center center;
    }

    .org-banner-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 5px;
      display: flex;
      align-items: flex-end;
    }
    .org-banner-name {
      height: 57px;
      opacity: 0;
    }

    .org-logo img {
        width: 136px;
        height: 136px;
        opacity: 0;
        margin-left: 5px;
    }

    .org-details .info {
        width: fit-content;
        opacity: 1;
        margin-left: 30px;
        margin-top: 10px;
        color: white;
    }
    .line-item {
        display: flex;
        justify-content: space-between;
    }
</style>