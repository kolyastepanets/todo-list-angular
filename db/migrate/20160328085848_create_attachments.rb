class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.string :file
      t.integer :comment_id

      t.timestamps null: false
    end
    add_index :attachments, :comment_id
  end
end
