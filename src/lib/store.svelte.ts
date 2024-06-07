function ref<Type>(initial?: Type) {
  let value = $state(initial);
  return {
    get value() {
      return value as Type;
    },
    set value(v: Type) {
      value = v;
    },
  };
}

export const user = ref();
export const token = ref();
export const cursors = ref({});
