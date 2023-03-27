# Feature: BottomSheet

## Scenario: Appears

---

> Given: The button that makes the BottomSheet appear

> When: I press the button.

> Then: The component appears from bottom to top

## Scenario: Disappears

---

> When: I press the background

> Then: The BottomSheet disappears as it goes down from top to bottom.

---

> When: I drag the indicator down.

> Then: The BottomSheet disappears as it goes down from top to bottom.
