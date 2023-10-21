import clsx from 'classnames';
import React, { Dispatch, SetStateAction, useEffect, useImperativeHandle, useState } from 'react';
import TagsListStyles from '../styles/TagsList.module.scss'
import { cloneDeep, get } from 'lodash';
import { IOption, ITagCurrent, ITagItemCurrent, ITypeCurrent } from '../interfaces/createCurrent';

export const Tag = (props: ITagCurrent) => {
    const { active, data, handleClick, closeIcon } = props;
    return <div
        className={clsx(TagsListStyles.bodyItem, { [TagsListStyles.current]: active })}
        onClick={() => { !!handleClick && handleClick(data) }}>
        {data.label}
        {closeIcon && <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path></svg>}
    </div>
}

export const mockData: ITypeCurrent[] = [
    {
        name: "Base",
        type: "radio",
        cate: [
            { label: "woman", value: "base_woman_default" },
            { label: "model", value: "base_model" },
            { label: "miss universe model", value: "base_miss_universe" },
            { label: "milf", value: "base_milf" },
            { label: "celebrity", value: "base_celebrity" },
            { label: "athlete", value: "base_athlete" },
            { label: "bodybuilder", value: "base_bodybuilder" },
            { label: "lingerie model", value: "base_lingerie_model" },
            { label: "cyborg", value: "base_cyborg" },
            { label: "sorority", value: "base_sorority" },
            { label: "bimbo", value: "base_bimbo" },
            { label: "woman + man", value: "base_man_woman" },
        ]
    }, {
        name: "Number of people",
        type: "radio",
        cate: [
            { label: "one", value: "number_one_default" },
            { label: "two", value: "number_two" },
            { label: "several", value: "number_group" },
        ]
    },
    {
        name: "Body",
        type: "checkbox",
        cate: [
            { label: "busty", value: "tags_busty" },
            { label: "huge boobs", value: "tags_huge_boobs" },
            { label: "perfect boobs", value: "tags_perfect_boobs" },
            { label: "beautiful", value: "tags_beautiful" },
            { label: "glasses", value: "tags_glasses" },
            { label: "sunglasses", value: "tags_sunglasses" },
            { label: "tattoos", value: "tags_tattoo" },
            { label: "lipstick", value: "tags_lipstick" },
            { label: "muscular", value: "tags_muscular" },
            { label: "big ass", value: "tags_big_ass" },
            { label: "small ass", value: "tags_small_ass" },
            { label: "skinny", value: "tags_skinny" },
            { label: "abs", value: "tags_abs" },
            { label: "thick", value: "tags_thick" },
            { label: "chubby", value: "tags_chubby" },
            { label: "fat", value: "tags_fat" },
            { label: "big hips", value: "tags_big_hips" },
            { label: "long legs", value: "tags_long_legs" },
            { label: "short", value: "tags_short" },
            { label: "tall", value: "tags_tall" },
            { label: "perfect body", value: "tags_perfect_body" },
            { label: "pubic hair", value: "tags_pubic_hair" },
            { label: "short hair", value: "tags_short_hair" },
            { label: "long hair", value: "tags_long_hair" },
            { label: "curly hair", value: "tags_curly_hair" },
            { label: "pregnant", value: "tags_pregnant" },
            { label: "tanned skin", value: "tags_dark_skin" },
            { label: "fairer skin", value: "tags_fair_skin" },
            { label: "dark skin", value: "tags_darker_skin" },
            { label: "oiled body", value: "tags_oiled_body" }
        ]
    },
    {
        name: "Age",
        type: "radio",
        cate: [
            { label: "18", value: "age_18" },
            { label: "20s", value: "age_20s" },
            { label: "30s", value: "age_30s" },
            { label: "40s", value: "age_40s" },
            { label: "50s", value: "age_50s" },
            { label: "60s", value: "age_60s" },
            { label: "70s", value: "age_70s" },
            { label: "80s", value: "age_80s" },
        ]
    },
    {
        name: "Face",
        type: "radio",
        cate: [
            { label: "happy", value: "face_happy" },
            { label: "sad", value: "face_sad" },
            { label: "serious", value: "face_serious" },
            { label: "laughing", value: "face_laughing" },
            { label: "orgasm", value: "face_orgasm" },
            { label: "seductive", value: "face_seductive" },
            { label: "pouting lips", value: "face_pouting" },
            { label: "shocked", value: "face_shocked" },
            { label: "angry", value: "face_angry" },
            { label: "ahegao", value: "face_ahegao" },
        ]
    },
    {
        name: "Hair Color",
        type: "radio",
        cate: [
            { label: "blonde", value: "tags_blonde" },
            { label: "brunette", value: "tags_brunette" },
            { label: "ginger", value: "tags_ginger" },
            { label: "white hair", value: "tags_white_hair" },
            { label: "black hair", value: "tags_black_hair" },
            { label: "blue hair", value: "tags_blue_hair" },
            { label: "green hair", value: "tags_green_hair" },
            { label: "purple hair", value: "tags_purple_hair" },
            { label: "pink hair", value: "tags_pink_hair" },
        ]
    },
    {
        name: "Hair Style",
        type: "radio",
        cate: [
            { label: "bobcut", value: "tags_bob_haircut" },
            { label: "pigtails", value: "tags_pigtails_haircut" },
            { label: "hair bun", value: "tags_hair_bun" },
            { label: "pixie", value: "tags_pixie_haircut" },
            { label: "ponytail", value: "tags_ponytail_haircut" },
            { label: "messy", value: "tags_messy_hair" },
            { label: "bangs", value: "tags_bangs_hair" },
            { label: "braided", value: "tags_braided_hair" },
            { label: "slicked", value: "tags_slick_haircut" },
            { label: "straight", value: "tags_straight_hair" },
        ]
    },
    {
        name: "Ethnicity",
        type: "radio",
        cate: [
            { label: "african", value: "tags_african" },
            { label: "arabic", value: "tags_arabic" },
            { label: "asian", value: "tags_asian" },
            { label: "black", value: "tags_black" },
            { label: "brazilian", value: "tags_brazilian" },
            { label: "british", value: "tags_british" },
            { label: "chinese", value: "tags_chinese" },
            { label: "czech", value: "tags_czech" },
            { label: "dutch", value: "tags_dutch" },
            { label: "egyptian", value: "tags_egyptian" },
            { label: "ethiopian", value: "tags_ethiopian" },
            { label: "filipina", value: "tags_filipina" },
            { label: "french", value: "tags_french" },
            { label: "german", value: "tags_german" },
            { label: "greek", value: "tags_greek" },
            { label: "hungarian", value: "tags_hungarian" },
            { label: "indian", value: "tags_indian" },
            { label: "indonesian", value: "tags_indonesian" },
            { label: "irish", value: "tags_irish" },
            { label: "italian", value: "tags_italian" },
            { label: "japanese", value: "tags_japanese" },
            { label: "jewish", value: "tags_jewish" },
            { label: "korean", value: "tags_korean" },
            { label: "latina", value: "tags_mexican" },
            { label: "malaysian", value: "tags_malaysian" },
            { label: "middle eastern", value: "tags_middle_eastern" },
            { label: "mongolian", value: "tags_mongolian" },
            { label: "native american", value: "tags_native_american" },
            { label: "nigerian", value: "tags_nigerian" },
            { label: "nilotic", value: "tags_nilotic" },
            { label: "persian", value: "tags_persian" },
            { label: "polynesian", value: "tags_polynesian" },
            { label: "portuguese", value: "tags_portuguese" },
            { label: "russian", value: "tags_russian" },
            { label: "scandinavian", value: "tags_scandinavian" },
            { label: "spanish", value: "tags_spanish" },
            { label: "swedish", value: "tags_swedish" },
            { label: "thai", value: "tags_thai" },
            { label: "turkish", value: "tags_turkish" },
            { label: "vietnamese", value: "tags_vietnamese" },
            { label: "white", value: "tags_white" },
        ]
    },
    {
        name: "Style",
        type: "radio",
        cate: [
            { label: "mirror selfie", value: "style_mirror_selfie" },
            { label: "painting", value: "style_artistic" },
            { label: "black and white", value: "style_black_and_white" },
            { label: "vintage", value: "style_vintage" },
            { label: "film photo", value: "style_film" },
            { label: "soft anime", value: "style_anime" },
            { label: "crisp anime", value: "style_crisp_anime" },
            { label: "soft + warm", value: "style_soft_warm" },
            { label: "illustrationr", value: "style_illustration" },
            { label: "dark fantasy", value: "style_fantasy" },
            { label: "warm anime", value: "style_warm_anime" },
            { label: "cyberpunk", value: "style_cyberpunk" },
            { label: "skin detail (beta)", value: "style_skin_detail" },
            { label: "charcoal", value: "style_charcoal" },
            { label: "3d", value: "style_3d" },
            { label: "watercolor", value: "style_watercolor" },
            { label: "comic", value: "style_comic" },
        ]
    },
    {
        name: "Setting",
        type: "radio",
        cate: [
            { label: "bar", value: "env_bar" },
            { label: "bathroom", value: "env_bathroom" },
            { label: "beach", value: "env_beach" },
            { label: "bedroom", value: "env_bedroom" },
            { label: "bus", value: "env_bus" },
            { label: "cafe", value: "env_cafe" },
            { label: "car", value: "env_car" },
            { label: "casino", value: "env_casino" },
            { label: "cave", value: "env_cave" },
            { label: "changing room", value: "env_changing_room" },
            { label: "church", value: "env_church" },
            { label: "club", value: "env_club" },
            { label: "couch", value: "env_couch" },
            { label: "desert", value: "env_desert" },
            { label: "forest", value: "env_forest" },
            { label: "grocery", value: "env_grocery" },
            { label: "gym", value: "env_gym" },
            { label: "hospital", value: "env_hospital" },
            { label: "hot tub", value: "env_hot_tub" },
            { label: "jungle", value: "env_jungle" },
            { label: "kitchen", value: "env_kitchen" },
            { label: "lake", value: "env_lake" },
            { label: "locker room", value: "env_locker_room" },
            { label: "mall", value: "env_mall" },
            { label: "meadow", value: "env_meadow" },
            { label: "moon", value: "env_space" },
            { label: "mountains", value: "env_mountains" },
            { label: "oasis", value: "env_oasis" },
            { label: "office", value: "env_office" },
            { label: "onsen", value: "env_onsen" },
            { label: "party", value: "env_party" },
            { label: "pool", value: "env_pool" },
            { label: "prison", value: "env_prison" },
            { label: "restaurant", value: "env_restaurant" },
            { label: "sauna", value: "env_sauna" },
            { label: "shower", value: "env_shower" },
            { label: "snow", value: "env_snow" },
            { label: "stage", value: "env_stage" },
            { label: "street", value: "env_street" },
            { label: "strip club", value: "env_strip_club" },
            { label: "tent", value: "env_tent" },
            { label: "train", value: "env_train" },
            { label: "underwater", value: "env_underwater" },
            { label: "wedding", value: "env_wedding" },
            { label: "yacht", value: "env_yacht" },
        ]
    },
    {
        name: "View",
        type: "radio",
        cate: [
            { label: "front view", value: "view_front" },
            { label: "side view", value: "view_side" },
            { label: "back view", value: "view_back" },
            { label: "close-up view", value: "view_close" }
        ]
    },
    {
        name: "Action",
        type: "radio",
        cate: [
            { label: "yoga", value: "action_yoga" },
            { label: "sleeping", value: "action_sleeping" },
            { label: "squatting", value: "action_squatting" },
            { label: "cooking", value: "action_cooking" },
            { label: "eating", value: "action_eating" },
            { label: "jumping", value: "action_jumping" },
            { label: "working out", value: "action_exercise" },
            { label: "t-pose", value: "action_t_pose" },
            { label: "bathing", value: "action_bathing" },
            { label: "gaming", value: "action_video_games" },
            { label: "plank", value: "action_plank" },
            { label: "massage", value: "action_massage" },
            { label: "bending over", value: "action_bending_over" },
            { label: "spreading legs", value: "action_spreading_legs" },
            { label: "cumshot", value: "action_cumshot" },
            { label: "on back", value: "action_on_back" },
            { label: "straddling", value: "action_straddling" }
        ]
    },
    {
        name: "Clothing",
        type: "checkbox",
        cate: [
            { label: "nude", value: "clothes_nude_default" },
            { label: "60s", value: "clothes_60s" },
            { label: "70s", value: "clothes_70s" },
            { label: "80s", value: "clothes_80s" },
            { label: "90s", value: "clothes_90s" },
            { label: "angel", value: "clothes_angel" },
            { label: "apron", value: "clothes_apron" },
            { label: "basketball", value: "clothes_basketball" },
            { label: "bathrobe", value: "clothes_bathrobe" },
            { label: "bdsm", value: "clothes_bdsm" },
            { label: "beach volleyball", value: "clothes_beach_volleyball" },
            { label: "bikini", value: "clothes_bikini" },
            { label: "blouse", value: "clothes_blouse" },
            { label: "bodypaint", value: "clothes_bomber" },
            { label: "bomber", value: "action_spreading_legs" },
            { label: "boots", value: "clothes_boots" },
            { label: "bow tie", value: "clothes_bow_tie" },
            { label: "bra", value: "clothes_bra" },
            { label: "casual", value: "clothes_casual" },
            { label: "cheerleader", value: "clothes_cheerleader" },
            { label: "chemise", value: "clothes_chemise" },
            { label: "choker", value: "clothes_choker" },
            { label: "clown", value: "clothes_clown" },
            { label: "construction worker", value: "clothes_construction_worker" },
            { label: "corset", value: "clothes_corset" },
            { label: "cosplay", value: "clothes_cosplay" },
            { label: "crop top", value: "clothes_crop_top" },
            { label: "daisy dukes", value: "clothes_daisy_dukes" },
            { label: "devil", value: "clothes_devil" },
            { label: "dirndl", value: "clothes_dirndl" },
            { label: "doctor", value: "clothes_doctor" },
            { label: "dominatrix", value: "clothes_dominatrix" },
            { label: "dress", value: "clothes_dress" },
            { label: "face mask", value: "clothes_face_mask" },
            { label: "fantasy armor", value: "clothes_fantasy_armor" },
            { label: "firefighter", value: "clothes_firefighter" },
            { label: "fishnet", value: "clothes_fishnet" },
            { label: "flight attendant", value: "clothes_flight_attendant" },
            { label: "fur", value: "clothes_fur" },
            { label: "geisha", value: "clothes_geisha" },
            { label: "gloves", value: "clothes_gloves" },
            { label: "golf", value: "clothes_golf" },
            { label: "goth", value: "clothes_goth" },
            { label: "halloween", value: "clothes_halloween_outfit" },
            { label: "harem pants", value: "clothes_harem_pants" },
            { label: "harlequin", value: "clothes_harlequin" },
            { label: "hat", value: "clothes_hat" },
            { label: "high heels", value: "clothes_high_heels" },
            { label: "high socks", value: "clothes_high_socks" },
            { label: "hijab", value: "clothes_hijab" },
            { label: "hip hop", value: "clothes_hip_hop" },
            { label: "jacket", value: "clothes_jacket" },
            { label: "jeans", value: "clothes_jeans" },
            { label: "jumpsuit", value: "clothes_jumpsuit" },
            { label: "kilt", value: "clothes_kilt" },
            { label: "kimono", value: "clothes_kimono" },
            { label: "lab coat", value: "clothes_lab_coat" },
            { label: "latex", value: "clothes_latex" },
            { label: "leather", value: "clothes_leather" },
            { label: "lingerie", value: "clothes_lingerie" },
            { label: "long skirt", value: "clothes_long_skirt" },
            { label: "lumberjack", value: "clothes_lumberjack" },
            { label: "maid", value: "clothes_maid" },
            { label: "martial arts", value: "clothes_martial_arts" },
            { label: "mech suit", value: "clothes_mech_suit" },
            { label: "medieval", value: "clothes_medieval" },
            { label: "mesh", value: "clothes_mesh" },
            { label: "micro skirt", value: "clothes_micromini" },
            { label: "microkini", value: "clothes_microkini" },
            { label: "military", value: "clothes_military" },
            { label: "mini skirt", value: "clothes_mini_skirt" },
            { label: "nightgown", value: "clothes_nightgown" },
            { label: "ninja", value: "clothes_ninja" },
            { label: "niqab", value: "clothes_niqab" },
            { label: "nun", value: "clothes_nun" },
            { label: "nurse", value: "clothes_nurse" },
            { label: "one piece swimsuit", value: "clothes_one_piece_swimsuit" },
            { label: "onesie", value: "clothes_onesie" },
            { label: "pajamas", value: "clothes_pajamas" },
            { label: "panties", value: "clothes_panties" },
            { label: "pantyhose", value: "clothes_pantyhose" },
            { label: "parka", value: "clothes_parka" },
            { label: "pilot", value: "clothes_pilot" },
            { label: "pirate", value: "clothes_pirate" },
            { label: "police", value: "clothes_police" },
            { label: "polo", value: "clothes_polo" },
            { label: "professor", value: "clothes_professor" },
            { label: "push-up bra", value: "clothes_push_up_bra" },
            { label: "race driver", value: "clothes_race_driver" },
            { label: "roman", value: "clothes_roman" },
            { label: "sailor", value: "clothes_sailor" },
            { label: "salwar", value: "clothes_salwar" },
            { label: "santa", value: "clothes_santa" },
            { label: "sari", value: "clothes_sari" },
            { label: "satin", value: "clothes_satin" },
            { label: "scarf", value: "clothes_scarf" },
            { label: "sci-fi armor", value: "clothes_sci_fi" },
            { label: "secretary", value: "clothes_secretary" },
            { label: "shirt", value: "clothes_shirt" },
            { label: "short shorts", value: "clothes_short_shorts" },
            { label: "soccer", value: "clothes_soccer" },
            { label: "space suit", value: "clothes_space_suit" },
            { label: "spandex", value: "clothes_spandex" },
            { label: "sports", value: "clothes_sports" },
            { label: "sports bra", value: "clothes_sports_bra" },
            { label: "steampunk", value: "clothes_steampunk" },
            { label: "stockings", value: "clothes_stockings" },
            { label: "stylish", value: "clothes_stylish" },
            { label: "suit", value: "clothes_suit" },
            { label: "sundress", value: "clothes_sundress" },
            { label: "superhero", value: "clothes_superhero" },
            { label: "suspender belt", value: "clothes_suspender_belt" },
            { label: "sweater", value: "clothes_sweater" },
            { label: "tailcoat", value: "clothes_tailcoat" },
            { label: "tank top", value: "clothes_tank_top" },
            { label: "teacher", value: "clothes_teacher" },
            { label: "tennis", value: "clothes_tennis" },
            { label: "thigh socks", value: "clothes_thigh_socks" },
            { label: "thong", value: "clothes_thong" },
            { label: "tie", value: "clothes_tie" },
            { label: "towel", value: "clothes_towel" },
            { label: "traditional", value: "clothes_traditional" },
            { label: "trench coat", value: "clothes_trench_coat" },
            { label: "tribal", value: "clothes_tribal" },
            { label: "tunic", value: "clothes_tunic" },
            { label: "underwear", value: "clothes_underwear" },
            { label: "vampire", value: "clothes_vampire" },
            { label: "victorian", value: "clothes_victorian" },
            { label: "viking", value: "clothes_viking" },
            { label: "waitress", value: "clothes_waitress" },
            { label: "wedding", value: "clothes_wedding_dress" },
            { label: "western", value: "clothes_western" },
            { label: "witch", value: "clothes_witch" },
            { label: "yoga pants", value: "clothes_yoga_pants" },
            { label: "flamenco dancer", value: "studio_QxRhbl1g2BQCJ7FWzHO2" },
        ]
    },
    {
        name: "Accessories/Objects",
        type: "checkbox",
        cate: [
            { label: "beer", value: "tags_beer" },
            { label: "diamond jewelry", value: "tags_diamond_jewelry" },
            { label: "gold jewelry", value: "tags_gold_jewelry" },
            { label: "jewelry", value: "tags_jewelry" },
            { label: "pearl jewelry", value: "tags_pearl_jewelry" },
            { label: "wine", value: "tags_wine" },
            { label: "eagle", value: "studio_dxI9fxTQAIRUbIliLmBH" }
        ]
    },
    {
        name: "Modifiers/Effects",
        type: "checkbox",
        cate: [
            { label: "bright lighting", value: "tags_bright_lighting" },
            { label: "dark lighting", value: "tags_dark_lighting" },

        ]
    },
]

export const generatorDict=[
    { value: 'women_crisp', label: 'Women: Detailed' },
    { value: 'women_accurate', label: 'Women: Accurate' },
    { value: 'women_real', label: 'Women: Realistic' },
    { value: 'women', label: 'Women: Legacy' },
    { value: 'women_hd', label: 'Women: HD (SDXL)' },
    { value: 'women_intricate', label: 'Women: Intricate (SDXL)' },
    { value: 'anime', label: 'Anime: Base' },
    { value: 'anime_detailed', label: 'Anime: Detailed' },
    { value: 'men', label: 'Men: Base' },
    { value: 'men_detailed', label: 'Men: Base' },
    { value: 'doggystyle', label: 'Doggystyle' },
    { value: 'blowjob', label: 'Blowjob' },
    { value: 'missionary', label: 'Missionary' },
    { value: 'titfuck', label: 'Titfuck' },
]

export const ratioDict=[
    { value: '3:4', label: '3:4' },
    { value: '9:16', label: '9:16' },
    { value: '1:1', label: '1:1' },
    { value: '4:3', label: '4:3' },
    { value: '16:9', label: '16:9' },
]

export const ListItem = (props: { setTagsMap: Dispatch<SetStateAction<ITagItemCurrent>>, data: ITypeCurrent, tagsMap: ITagItemCurrent }) => {

    const { data, tagsMap, setTagsMap } = props
    const name = data.name
    const { type } = data;
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [currentKey, setCurrentKey] = useState<IOption[]>([])

    useEffect(() => {
        if (tagsMap && tagsMap[name] && Array.isArray(tagsMap[name])) {
            const current = get(data, 'cate', [])
                .filter(item => tagsMap[name].find(w => w.value === item.value))
            if (current.length) {
                setCurrentKey(current)
                setIsOpen(true)
            }else{
                setCurrentKey([]) 
            }
        }
    }, [tagsMap])


    return <div className={clsx(TagsListStyles.blockList, { [TagsListStyles.open]: isOpen })}>
        <div className={TagsListStyles.listHeader} onClick={() => setIsOpen(!isOpen)}>
            <div className={TagsListStyles.headerLeft}>
                {name}
            </div>
            <div className={TagsListStyles.headerRight}>
                {isOpen ?
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
                    : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>}
            </div>
        </div>

        {
            <div className={isOpen ? TagsListStyles.show : TagsListStyles.hide}>

                <div className={TagsListStyles.listBody}>
                    {get(data, 'cate', []).map((item: IOption) => {

                        return <Tag
                            key={item.value}
                            handleClick={(value: IOption) => {
                                let nextValue;
                                if (!currentKey.find(c => c.value === value.value)) {
                                    nextValue = type === "checkbox" ? currentKey.concat([value]) : [value]
                                    setCurrentKey(nextValue)
                                    tagsMap[name] = nextValue
                                    setTagsMap(cloneDeep(tagsMap))
                                }
                            }
                            }
                            active={currentKey.includes(item)}
                            data={item} />
                    })}
                </div>

            </div>
        }
    </div>
}

export interface IProps {
    formData?: ITagItemCurrent
}

export default React.forwardRef((props: IProps, ref) => {

    const { formData } = props

    const [tagsMap, setTagsMap] = useState<ITagItemCurrent>({});

    useImperativeHandle(ref, () => ({
         tagsMap:cloneDeep(tagsMap)
    }));

    const renderTags = (tagsMap: ITagItemCurrent): any => {
        const valueAll = Object.values(tagsMap)
        const keyAll = Object.keys(tagsMap)
        return (valueAll || []).map((item: IOption[], index) => {
            return (

                item.map((one: IOption, index2) => <Tag
                    key={one.value}
                    active
                    data={one}
                    closeIcon
                    handleClick={(data: IOption) => {
                        const nextValue = item.filter(i => i.value !== data.value)
                        //@ts-ignore
                        tagsMap[keyAll[index]] = nextValue
                        setTagsMap(cloneDeep(tagsMap))
                    }}
                />)


            )



        })
    }

    useEffect(() => {
        if (formData) {
            setTagsMap(cloneDeep(formData))
        }
    }, [formData])

    return <>
    
    <div className={TagsListStyles.tagMap}>
        {renderTags(tagsMap as ITagItemCurrent)}
    </div>
        {mockData.map((item, index) => <ListItem setTagsMap={setTagsMap} tagsMap={tagsMap} key={item.name} data={item} />)}

    </>
})