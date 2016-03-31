FactoryGirl.define do
  factory :attachment do
    file do
      File.open(File.join(Rails.root, 'spec', 'rails_helper.rb'))
    end
  end
end
