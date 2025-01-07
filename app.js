const userTimes = [];
function showOption() {
  const form = document.getElementById("optionsForm");
  const selectedOption = form.option.value;

  if (selectedOption === "all") {
    showAllOverlap();
  } else if (selectedOption === "most") {
    showMostOverlap();
  }
}
// 사용자 추가
function addUser() {
  const date = document.getElementById("date").value;
  const startTime = document.getElementById("starttime").value;
  const endTime = document.getElementById("endtime").value;

  //에러 처리리
  if (!date || !startTime || !endTime) {
    alert("날짜와 시간을 모두 입력해주세요.");
    return;
  }

  if (startTime >= endTime) {
    alert("시작 시간은 종료 시간보다 빨라야 합니다.");
    return;
  }

  //시간 배열에 넣어야 해해
  userTimes.push({
    date,
    startTime,
    endTime,
  });

  document.getElementById("date").value = "";
  document.getElementById("starttime").value = "";
  document.getElementById("endtime").value = "";

  const output = document.getElementById("output");
  output.innerHTML = `<p>사용자 ${userTimes.length} 추가됨: ${date}, ${startTime} ~ ${endTime}</p>`;
}
//모두 겹칠 때
function showAllOverlap() {
  if (userTimes.length < 2) {
    alert("사용자를 최소 2명 추가해주세요.");
    return;
  }
  console.log(userTimes);

  let globalStart = "00:00";
  let globalEnd = "23:59";

  userTimes.forEach(({ startTime, endTime }) => {
    globalStart = globalStart > startTime ? globalStart : startTime;
    globalEnd = globalEnd < endTime ? globalEnd : endTime;
  });

  const result =
    globalStart < globalEnd
      ? `${globalStart} ~ ${globalEnd}`
      : "겹치는 시간이 없습니다.";
  document.getElementById(
    "output"
  ).innerHTML = `<p><strong>모든 사용자가 가능한 시간:</strong> ${result}</p>`;
}
// 가장 많은 시간대대
function showMostOverlap() {
  //  사용자 하나일때 에러처리
  if (userTimes.length < 2) {
    alert("사용자를 최소 2명 추가해주세요.");
    return;
  }

  const timePoints = [];
  userTimes.forEach(({ startTime, endTime }) => {
    timePoints.push({ time: startTime, type: "start" });
    timePoints.push({ time: endTime, type: "end" });
  });

  timePoints.sort((a, b) => (a.time > b.time ? 1 : a.time < b.time ? -1 : 0));

  let currentOverlap = 0;
  let maxOverlap = 0;
  let maxStart = "";
  let maxEnd = "";

  timePoints.forEach((point, index) => {
    if (point.type === "start") {
      currentOverlap++;
      //계속 갱신신
      if (currentOverlap > maxOverlap) {
        maxOverlap = currentOverlap;
        maxStart = point.time;
        maxEnd =
          index + 1 < timePoints.length ? timePoints[index + 1].time : "";
      }
    } else {
      currentOverlap--;
    }
  });

  const result =
    maxStart && maxEnd ? `${maxStart} ~ ${maxEnd}` : "겹치는 시간이 없습니다.";
  document.getElementById(
    "output"
  ).innerHTML = `<p><strong>가장 많은 사용자가 가능한 시간:</strong> ${result}</p>`;
}
