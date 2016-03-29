class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content

  has_many :attachments
end
