Feature: BottomSheet

  Scenario: 열기
    When 활성화 버튼을 누른다.
    Then 컴포넌트가 나타난다.

  Scenario: 백그라운드 눌러서 닫기
    When 백그라운드를 누른다.
    Then 컴포넌트는 위에서 아래로 내려가면서 사라진다.

  Scenario: 인디케이터 드래그해서 닫기
    When 인디케이터를 아래로 일정 거리만큼 드래그 한 후, 놓는다.
    Then 컴포넌트는 위에서 아래로 내려가면서 사라진다.
