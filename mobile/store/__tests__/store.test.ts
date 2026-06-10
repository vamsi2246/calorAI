// ====================================================
// Zustand Store State Mutation Unit Tests
// ====================================================

import { useFoodStore } from "../useFoodStore";

describe("CalorAI Zustand Preference Store", () => {
  beforeEach(() => {
    useFoodStore.getState().resetSwipes();
  });

  test("should start with empty swipe lists and history", () => {
    const state = useFoodStore.getState();
    expect(state.likedFoods).toEqual([]);
    expect(state.dislikedFoods).toEqual([]);
    expect(state.superLikedFoods).toEqual([]);
    expect(state.unsureFoods).toEqual([]);
    expect(state.swipeHistory).toEqual([]);
  });

  test("should correctly record different swipe choices", () => {
    const store = useFoodStore.getState();
    
    store.swipeFood("food_1", "like");
    store.swipeFood("food_2", "dislike");
    store.swipeFood("food_3", "superlike");
    store.swipeFood("food_4", "unsure");

    const updated = useFoodStore.getState();
    expect(updated.likedFoods).toEqual(["food_1"]);
    expect(updated.dislikedFoods).toEqual(["food_2"]);
    expect(updated.superLikedFoods).toEqual(["food_3"]);
    expect(updated.unsureFoods).toEqual(["food_4"]);
    expect(updated.swipeHistory.length).toBe(4);
  });

  test("should support undo action stack operations", () => {
    const store = useFoodStore.getState();
    
    store.swipeFood("food_1", "like");
    store.swipeFood("food_2", "dislike");
    
    // Undo last action (food_2 dislike)
    store.undoLastSwipe();

    let updated = useFoodStore.getState();
    expect(updated.likedFoods).toEqual(["food_1"]);
    expect(updated.dislikedFoods).toEqual([]);
    expect(updated.swipeHistory.length).toBe(1);
    expect(updated.redoHistory).toEqual([{ foodId: "food_2", type: "dislike" }]);

    // Undo first action (food_1 like)
    store.undoLastSwipe();

    updated = useFoodStore.getState();
    expect(updated.likedFoods).toEqual([]);
    expect(updated.swipeHistory.length).toBe(0);
    expect(updated.redoHistory.length).toBe(2);
  });

  test("should support redo action stack operations", () => {
    const store = useFoodStore.getState();
    
    store.swipeFood("food_1", "like");
    store.undoLastSwipe();

    let updated = useFoodStore.getState();
    expect(updated.likedFoods).toEqual([]);

    store.redoSwipe();

    updated = useFoodStore.getState();
    expect(updated.likedFoods).toEqual(["food_1"]);
    expect(updated.swipeHistory.length).toBe(1);
    expect(updated.redoHistory.length).toBe(0);
  });

  test("should calculate correct swiping completion rate percentages", () => {
    const store = useFoodStore.getState();
    expect(store.getCompletionRate()).toBe(0);

    // Swipe 5 cards
    for (let i = 1; i <= 5; i++) {
      store.swipeFood(`item_${i}`, "like");
    }

    expect(useFoodStore.getState().getCompletionRate()).toBe(Math.round((5 / 15) * 100));

    // Swipe 15 cards (unlock condition)
    for (let i = 6; i <= 15; i++) {
      store.swipeFood(`item_${i}`, "like");
    }

    expect(useFoodStore.getState().getCompletionRate()).toBe(100);
  });
});
