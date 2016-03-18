require 'rails_helper'

RSpec.describe Task, type: :model do
  it { should validate_presence_of :title }
  it { should validate_presence_of :project_id }

  it { should belong_to :project }
end
