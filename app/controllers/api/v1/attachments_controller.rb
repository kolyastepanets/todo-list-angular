module Api
  module V1
    class AttachmentsController < ApplicationController
      load_and_authorize_resource :comment
      load_and_authorize_resource :attachment, through: :comment
      respond_to :json

      def create
        respond_with(:api, :v1, @comment, @comment.attachments.create(attachment_params))
      end

      private

        def attachment_params
          params.require(:file).permit(:file)
        end
    end
  end
end
