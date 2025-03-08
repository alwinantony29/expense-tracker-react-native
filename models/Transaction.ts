import { Model } from "@nozbe/watermelondb";
import { field, date, readonly, text } from "@nozbe/watermelondb/decorators";

export default class Transaction extends Model {
  static table = "transactions";

  @field("amount") amount!: number;
  @text("description") description!: string;
  @text("date") date!: string;
  @text("categoryId") categoryId!: string;
  @text("tags") tags!: string;
  @readonly @date("createdAt") createdAt!: Date;
  @readonly @date("updatedAt") updatedAt!: Date;

  // Helper methods
  get parsedTags(): string[] {
    return this.tags ? JSON.parse(this.tags) : [];
  }

  get isExpense(): boolean {
    return this.amount < 0;
  }

  get isIncome(): boolean {
    return this.amount > 0;
  }
}
