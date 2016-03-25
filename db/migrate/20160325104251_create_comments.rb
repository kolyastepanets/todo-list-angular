class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :task_id

      t.timestamps null: false
    end
    add_index :comments, :task_id
  end
end
