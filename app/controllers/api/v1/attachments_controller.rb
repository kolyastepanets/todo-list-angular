module Api
  module V1
    class AttachmentsController < ApplicationController
      load_and_authorize_resource :comment
      load_and_authorize_resource :attachment, through: :comment

      def create
        @attachment.save
        render json: @attachment
      end

      private

        def attachment_params
          params.require(:file).permit(:file)
        end
    end
  end
end
