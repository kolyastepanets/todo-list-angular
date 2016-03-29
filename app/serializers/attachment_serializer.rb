class AttachmentSerializer < ActiveModel::Serializer
  attributes :id, :file, :file_identifier, :comment_id
end
