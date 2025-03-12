document.addEventListener("DOMContentLoaded", function () {
  const output = document.querySelector("input[name='output']"); // 입력창 선택

  // 키보드 입력 이벤트 추가
  document.addEventListener("keydown", function (event) {
    const lastChar = output.value.slice(-1); // 마지막 입력된 문자

    // 숫자 키 입력 (0~9)
    if (event.key >= "0" && event.key <= "9") {
      output.value += event.key;
    }

    // 연산자 입력 (+, -, *, /) - 연속 입력 방지
    if (["+", "-", "*", "/"].includes(event.key)) {
      if (output.value === "" || ["+", "-", "*", "/"].includes(lastChar)) {
        return; // 맨 처음 연산자 입력 방지 & 연속된 연산자 입력 방지
      }
      output.value += event.key;
    }

    // 소수점 입력 - 연속된 소수점 입력 방지
    if (event.key === ".") {
      if (
        output.value === "" ||
        lastChar === "." ||
        output.value
          .split(/[\+\-\*\/]/)
          .pop()
          .includes(".")
      ) {
        return; // 처음 입력 방지 & 연속된 소수점 입력 방지
      }
      output.value += event.key;
    }

    // Enter 키를 누르면 계산 실행 (= 버튼 클릭 효과)
    if (event.key === "Enter") {
      try {
        output.value = eval(output.value); // 보안 취약점이 있으므로 나중에 수정 가능
      } catch (error) {
        output.value = "Error"; // 잘못된 입력이 있으면 에러 표시
      }
    }

    // Backspace 키를 누르면 한 글자 삭제
    if (event.key === "Backspace") {
      output.value = output.value.slice(0, -1);
    }

    // Escape (Esc) 키를 누르면 C 버튼과 동일한 동작 (입력창 초기화)
    if (event.key === "Escape") {
      output.value = "";
    }

    // 기본 동작 방지 (특정 키에서 예상치 못한 동작 방지)
    event.preventDefault();
  });
});
