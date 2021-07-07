<template>
  <div class="loading-animation">
    <div class="dot-flashing"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loading-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 50%;
  height: 50%;
  z-index: 400;
  background-color: transparent;
}
.dot-flashing {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(50%);
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: black;
  color: black;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: black;
  color: black;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: black;
  color: black;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: black;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}
</style>
