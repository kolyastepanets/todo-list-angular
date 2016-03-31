class Attachment < ActiveRecord::Base
  belongs_to :comment

  validates :file, presence: true

  mount_uploader :file, FileUploader
end
