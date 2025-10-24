class HatchReportInsect < HatchlessRecord
  belongs_to :hatch_report
  belongs_to :insect

  validates :hatch_report, :insect, presence: true
end