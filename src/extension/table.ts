import Table from "@tiptap/extension-table";

export const TableNode = Table.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      resizable: true,
    };
  },
});
