# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

def doy(month, day)
  Date.new(2025, month, day).yday
end

puts "Seeding rivers..."
rush = River.find_or_create_by!(name: "Rush River", water_type: "freestone", designation: "Class I", designation_system: "WI DNR", description: "The Rush River is a picturesque trout stream located in western Wisconsin. Known for its clear waters and abundant aquatic life, the Rush River offers excellent fly fishing opportunities for anglers of all skill levels. The river meanders through a mix of rural landscapes and wooded areas, providing a serene setting for fishing enthusiasts. The Rush River is home to healthy populations of brown and rainbow trout, making it a popular destination for those seeking both challenging fishing and beautiful scenery.")
kinni = River.find_or_create_by!(name: "Kinnickinnic River", water_type: "freestone", designation: "Class I", designation_system: "WI DNR", description: "The Kinnickinnic River, affectionately known as the 'Kinni,' is a renowned trout stream located in western Wisconsin. It is celebrated for its crystal-clear waters, abundant aquatic life, and scenic beauty. The river flows through a mix of rural landscapes and small towns, providing excellent opportunities for fly fishing enthusiasts. The Kinni is home to healthy populations of brown and rainbow trout, making it a popular destination for anglers seeking both challenging fishing and picturesque surroundings.")

puts "Seeding insects..."

bwo = Insect.find_or_create_by!(
  common_name: "Blue-Winged Olive",
  scientific_name: "Baetis spp.",
  description: "Small mayflies hatching in spring and fall; prolific and important for trout."
)

pmd = Insect.find_or_create_by!(
  common_name: "Pale Morning Dun",
  scientific_name: "Ephemerella invaria",
  description: "Medium-sized mayflies, common in June–July, produce excellent dry-fly action."
)

hendrickson = Insect.find_or_create_by!(
  common_name: "Hendrickson",
  scientific_name: "Ephemerella subvaria",
  description: "Early-spring mayfly hatch, generally April; large-bodied, trout often rise aggressively."
)

sulphur = Insect.find_or_create_by!(
  common_name: "Sulphur",
  scientific_name: "Ephemerella excrucians",
  description: "Bright yellow mayflies, May–June; popular dry-fly hatch."
)

caddis = Insect.find_or_create_by!(
  common_name: "Caddisfly",
  scientific_name: "Trichoptera",
  description: "One of the most abundant insects, hatching spring through late summer."
)

stonefly = Insect.find_or_create_by!(
  common_name: "Yellow Sally",
  scientific_name: "Hesperoperla pacifica",
  description: "Stonefly, late spring; trout prefer nymph or emerger patterns."
)

tricos = Insect.find_or_create_by!(
  common_name: "Trico",
  scientific_name: "Tricorythodes spp.",
  description: "Tiny mayflies, July–September; favorite for experienced anglers targeting finicky fish."
)

scud = Insect.find_or_create_by!(
  common_name: "Scud",
  scientific_name: "Amphipoda",
  description: "Shrimp-like crustaceans, a critical trout food year-round."
)

midge = Insect.find_or_create_by!(
  common_name: "Midge",
  scientific_name: "Chironomidae",
  description: "Small, prolific insects; hatch continuously, important in cold water."
)

# Create FlyPatterns
adams = FlyPattern.find_or_create_by!(
  name: "Adams",
  category: "Dry",
  notes: "Classic dry fly, effective on many mayflies",
)

parachute_bwo = FlyPattern.find_or_create_by!(
  name: "Parachute BWO",
  category: "Dry",
  notes: "Blue-Winged Olive imitation, floats well",
)

pheasant_tail_nymph = FlyPattern.find_or_create_by!(
  name: "Pheasant Tail Nymph",
  category: "Nymph",
  notes: "Effective for mayfly nymphs",
)

hendrickson_dry = FlyPattern.find_or_create_by!(
  name: "Hendrickson",
  category: "Dry",
  notes: "Hatches in early season, popular pattern",
)

midge_pattern = FlyPattern.find_or_create_by!(
  name: "Zebra Midge",
  category: "Nymph",
  notes: "Tiny, prolific; works for midges",
)

stimulator = FlyPattern.find_or_create_by!(
  name: "Stimulator",
  category: "Dry",
  notes: "Effective for caddisfly and stonefly patterns",
)

# Create join table records
InsectFlyPattern.find_or_create_by!(fly_pattern: adams, insect: bwo)
InsectFlyPattern.find_or_create_by!(fly_pattern: adams, insect: pmd)
InsectFlyPattern.find_or_create_by!(fly_pattern: parachute_bwo, insect: bwo)
InsectFlyPattern.find_or_create_by!(fly_pattern: pheasant_tail_nymph, insect: bwo)
InsectFlyPattern.find_or_create_by!(fly_pattern: hendrickson_dry, insect: bwo)
InsectFlyPattern.find_or_create_by!(fly_pattern: midge_pattern, insect: midge)
InsectFlyPattern.find_or_create_by!(fly_pattern: stimulator, insect: stonefly)
InsectFlyPattern.find_or_create_by!(fly_pattern: stimulator, insect: caddis)

# --- HatchWindows ---

puts "Seeding hatch windows..."

# Rush River
HatchWindow.find_or_create_by!(river: rush, insect: bwo, start_day_of_year: doy(3, 20), end_day_of_year: doy(5, 15))
HatchWindow.find_or_create_by!(river: rush, insect: bwo, start_day_of_year: doy(9, 20), end_day_of_year: doy(10, 31)) # Fall
HatchWindow.find_or_create_by!(river: rush, insect: pmd, start_day_of_year: doy(6, 1), end_day_of_year: doy(7, 15))
HatchWindow.find_or_create_by!(river: rush, insect: hendrickson, start_day_of_year: doy(4, 1), end_day_of_year: doy(4, 30))
HatchWindow.find_or_create_by!(river: rush, insect: sulphur, start_day_of_year: doy(5, 1), end_day_of_year: doy(6, 15))
HatchWindow.find_or_create_by!(river: rush, insect: caddis, start_day_of_year: doy(4, 20), end_day_of_year: doy(9, 1))
HatchWindow.find_or_create_by!(river: rush, insect: stonefly, start_day_of_year: doy(5, 1), end_day_of_year: doy(5, 31))
HatchWindow.find_or_create_by!(river: rush, insect: tricos, start_day_of_year: doy(7, 1), end_day_of_year: doy(9, 15))
HatchWindow.find_or_create_by!(river: rush, insect: scud, start_day_of_year: doy(6, 1), end_day_of_year: doy(6, 20))
HatchWindow.find_or_create_by!(river: rush, insect: midge, start_day_of_year: doy(3, 1), end_day_of_year: doy(11, 30))

# Kinnickinnic River
HatchWindow.find_or_create_by!(river: kinni, insect: bwo, start_day_of_year: doy(5, 1), end_day_of_year: doy(6, 15))
HatchWindow.find_or_create_by!(river: kinni, insect: bwo, start_day_of_year: doy(9, 15), end_day_of_year: doy(10, 31)) # Fall
HatchWindow.find_or_create_by!(river: kinni, insect: caddis, start_day_of_year: doy(5, 10), end_day_of_year: doy(8, 31))
HatchWindow.find_or_create_by!(river: kinni, insect: tricos, start_day_of_year: doy(7, 1), end_day_of_year: doy(9, 15))
HatchWindow.find_or_create_by!(river: kinni, insect: scud, start_day_of_year: doy(6, 1), end_day_of_year: doy(6, 20))
HatchWindow.find_or_create_by!(river: kinni, insect: pmd, start_day_of_year: doy(6, 1), end_day_of_year: doy(7, 15))
HatchWindow.find_or_create_by!(river: kinni, insect: hendrickson, start_day_of_year: doy(4, 1), end_day_of_year: doy(4, 30))
HatchWindow.find_or_create_by!(river: kinni, insect: sulphur, start_day_of_year: doy(5, 1), end_day_of_year: doy(6, 15))
HatchWindow.find_or_create_by!(river: kinni, insect: stonefly, start_day_of_year: doy(5, 1), end_day_of_year: doy(5, 31))
HatchWindow.find_or_create_by!(river: kinni, insect: midge, start_day_of_year: doy(3, 1), end_day_of_year: doy(11, 30))

puts "✅ Done seeding full chart!"

# Dir[Rails.root.join('db', 'seeds', 'configs', '*.yml')].each do |file|
#   config = YAML.load_file(file)
#   SeedRiverChart.new(config).call
# end

fish_species = [
  # --- Trout & Salmonids ---
  { common_name: "Brown Trout", scientific_name: "Salmo trutta" },
  { common_name: "Rainbow Trout", scientific_name: "Oncorhynchus mykiss" },
  { common_name: "Brook Trout", scientific_name: "Salvelinus fontinalis" },
  { common_name: "Cutthroat Trout", scientific_name: "Oncorhynchus clarkii" },
  { common_name: "Lake Trout", scientific_name: "Salvelinus namaycush" },
  { common_name: "Bull Trout", scientific_name: "Salvelinus confluentus" },
  { common_name: "Arctic Grayling", scientific_name: "Thymallus arcticus" },
  { common_name: "Dolly Varden", scientific_name: "Salvelinus malma" },
  { common_name: "Steelhead", scientific_name: "Oncorhynchus mykiss" },
  { common_name: "Atlantic Salmon", scientific_name: "Salmo salar" },

  # --- Bass & Panfish ---
  { common_name: "Smallmouth Bass", scientific_name: "Micropterus dolomieu" },
  { common_name: "Largemouth Bass", scientific_name: "Micropterus salmoides" },
  { common_name: "Rock Bass", scientific_name: "Ambloplites rupestris" },
  { common_name: "Bluegill", scientific_name: "Lepomis macrochirus" },
  { common_name: "Pumpkinseed Sunfish", scientific_name: "Lepomis gibbosus" },
  { common_name: "Green Sunfish", scientific_name: "Lepomis cyanellus" },
  { common_name: "Crappie", scientific_name: "Pomoxis spp." },
  { common_name: "Redear Sunfish (Shellcracker)", scientific_name: "Lepomis microlophus" },

  # --- Pike, Musky, & Other Predators ---
  { common_name: "Northern Pike", scientific_name: "Esox lucius" },
  { common_name: "Muskellunge (Muskie)", scientific_name: "Esox masquinongy" },
  { common_name: "Chain Pickerel", scientific_name: "Esox niger" },
  { common_name: "Walleye", scientific_name: "Sander vitreus" },

  # --- Rough / Alternative Fly Species ---
  { common_name: "Carp", scientific_name: "Cyprinus carpio" },
  { common_name: "Freshwater Drum (Sheepshead)", scientific_name: "Aplodinotus grunniens" },
  { common_name: "Channel Catfish", scientific_name: "Ictalurus punctatus" },
  { common_name: "Gar", scientific_name: "Lepisosteus spp." },
  { common_name: "Mooneye", scientific_name: "Hiodon tergisus" },
  { common_name: "Goldeye", scientific_name: "Hiodon alosoides" },
  { common_name: "White Bass", scientific_name: "Morone chrysops" },
  { common_name: "Grayling (Mountain Whitefish)", scientific_name: "Prosopium williamsoni" }
]

fish_species.each do |attrs|
  Fish.find_or_create_by!(common_name: attrs[:common_name]) do |fish|
    fish.scientific_name = attrs[:scientific_name]
  end
end

puts "✅ Seeded #{Fish.count} freshwater fly-fishing species."