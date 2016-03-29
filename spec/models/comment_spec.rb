require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { should have_many(:attachments).dependent(:destroy) }
end
