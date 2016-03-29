class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :completed, :position, :end_date, :project_id

  has_many :comments
end
