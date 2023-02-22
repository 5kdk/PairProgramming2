// do something!
const AnalogClock = $container => {
  $container.innerHTML = `
    <div class="hand hour"></div>
    <div class="hand minute"></div>
    <div class="hand second"></div>
    <div class="time time1">|</div>
    <div class="time time2">|</div>
    <div class="time time3">|</div>
    <div class="time time4">|</div>
    <div class="time time5">|</div>
    <div class="time time6">|</div>
    <div class="time time7">|</div>
    <div class="time time8">|</div>
    <div class="time time9">|</div>
    <div class="time time10">|</div>
    <div class="time time11">|</div>
    <div class="time time12">|</div>
  `;

  const tick = () => {
    const currentTime = new Date();
    const [hr, min, sec] = [currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()];

    const secDegree = sec / 60;
    const minDegree = (secDegree + min) / 60;
    const hrDegree = (minDegree + hr) / 12;

    $container.querySelector('.hand.hour').style.setProperty('--deg', hrDegree * 360);
    $container.querySelector('.hand.minute').style.setProperty('--deg', minDegree * 360);
    $container.querySelector('.hand.second').style.setProperty('--deg', secDegree * 360);
  };

  tick();
  setInterval(tick, 1000);
};

export default AnalogClock;
