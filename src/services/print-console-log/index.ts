import type { Widget } from "@/components/UI/container/types";
import { onBeforeUnmount } from "vue";

export class PrintConsoleLog {
  public static beforeUnmountHook(props: Widget) {
    const date2 = new Date();
    console.log(
      "Окончание: Имя:",
      props.name,
      "ID",
      props.id,
      "Контейнер ID",
      props.containerId,
      "Имя файла",
      props.fileName,
      "Окончание воспроизвденеия",
      `${date2.getHours()}:${date2.getMinutes()}:${date2.getSeconds()}`
    );
  }

  public static createdHook(props: Widget) {
    const date = new Date();
    console.log(
      "Воспроизводим: Имя:",
      props.name,
      "ID",
      props.id,
      "Контейнер ID",
      props.containerId,
      "Имя файла",
      props.fileName,
      "Начало воспроизвденеия",
      `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    );
  }
}
