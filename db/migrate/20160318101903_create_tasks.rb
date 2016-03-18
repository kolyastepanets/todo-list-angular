class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :project_id
      t.string :title
      t.integer :position
      t.date :end_date
      t.boolean :completed

      t.timestamps null: false
    end
  end
end
