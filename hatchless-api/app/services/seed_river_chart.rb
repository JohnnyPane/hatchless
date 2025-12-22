class SeedRiverChart
  attr_reader :config, :river

  def initialize(config)
    @config = config.deep_symbolize_keys
  end

  def call
    seed_river
    puts "🦟 seeding insects for #{river.name}... 🦟"
    seed_insects
    puts "🪲 seeding fly patterns for #{river.name}... 🪲"
    seed_fly_patterns
    puts "🐣 seeding hatch windows for #{river.name}... 🐣"
    seed_hatch_windows
    puts "🐉 Finished seeding river chart for #{river.name}. 🐉"
  end

  private

  def seed_river
    @river = River.find_or_create_by!(name: config[:river][:name]) do |r|
      r.assign_attributes(config[:river].except(:name))
    end
  end

  def seed_insects
    @insects = {}
    Array(config[:insects]).each do |insect_data|
      insect = Insect.find_or_create_by!(
        scientific_name: insect_data[:scientific_name],
        common_name: insect_data[:common_name]
      ) do |i|
        i.assign_attributes(insect_data.except(:scientific_name, :common_name))
      end

      key = "#{insect.scientific_name}|#{insect.common_name}"
      @insects[key] = insect
    end
  end

  def seed_fly_patterns
    config[:fly_patterns].each do |insect_key, patterns|
      insect = @insects[insect_key.to_s]

      Array(patterns).each do |pattern_attrs|
        fly_pattern = FlyPattern.find_or_initialize_by(name: pattern_attrs[:name])
        fly_pattern.assign_attributes(pattern_attrs.except(:name))
        fly_pattern.save!

        if insect
          InsectFlyPattern.find_or_create_by!(fly_pattern: fly_pattern, insect: insect)
        else
          Rails.logger.warn "⚠️ No insect found for key '#{insect_key}' while seeding pattern #{pattern_attrs[:name]}"
        end
      end
    end
  end

  def seed_hatch_windows
    Array(config[:hatch_windows]).each do |hw|
      insect = @insects[hw[:insect].to_s]

      if insect
        HatchWindow.find_or_create_by!(
          river: river,
          insect: insect,
          start_day_of_year: hw[:start_day_of_year],
          end_day_of_year: hw[:end_day_of_year]
        )
      else
        Rails.logger.warn "⚠️ Skipping hatch window: No insect found for '#{hw[:insect]}'"
      end
    end
  end
end
