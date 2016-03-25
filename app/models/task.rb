class Task < ActiveRecord::Base
  validates :title, :project_id, presence: true

  belongs_to :project

  has_many :comments, dependent: :destroy

  default_scope { order("position ASC") }
end
