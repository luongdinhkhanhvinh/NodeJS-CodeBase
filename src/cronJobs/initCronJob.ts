import { TYPES } from "@injection/types";
import { Container } from "inversify";
import { CronJob } from "src/cronJobs/cronJob";

export class InitCronJob {
  constructor() {}

  public static init(appContainer: Container) {}
}
