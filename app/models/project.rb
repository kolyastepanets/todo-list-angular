class Project < ActiveRecord::Base
  belongs_to :user

  has_many :tasks, dependent: :destroy

  validates :name, :user_id, presence: true

  default_scope { order("created_at ASC") }

end
