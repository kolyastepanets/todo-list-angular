class Task < ActiveRecord::Base
  validates :title, :project_id, presence: true

  belongs_to :project
end
