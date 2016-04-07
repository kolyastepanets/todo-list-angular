class Comment < ActiveRecord::Base
  belongs_to :task

  validates :content, :task_id, presence: true

  has_many :attachments, dependent: :destroy

  default_scope { order("created_at ASC") }
end
