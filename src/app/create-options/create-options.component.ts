import { Component, OnInit } from '@angular/core';
import {UserInputService} from "../user-input.service";
import {NamesService} from "../names.service";
import {TaxTableComponent} from "../tax-table/tax-table.component";
import {TaxIDData} from "../user-input.service";

@Component({
    selector: 'app-create-options',
    templateUrl: './create-options.component.html',
    styleUrls: ['./create-options.component.css']
})
export class CreateOptionsComponent implements OnInit {

    constructor(
        public UserInputService: UserInputService,
        private taxTable: TaxTableComponent,
        private namesService: NamesService
    ) {
    }

    ngOnInit(): void {
    }

    // if rank is changed, keep taxIDs but show taxIDs for selected rank
    async find_taxids(event) {
        this.UserInputService.rankedTaxa = []
        let withParentID: TaxIDData[] = []
        let entry: TaxIDData;
        if (event.isUserInput) {
            let rank = event.source.value;
            if (rank == 'species') {
                this.taxTable.refreshTable(this.UserInputService.selectedTaxa)
            } else {
                for (let taxon of this.UserInputService.selectedTaxa) {
                    let taxiddata = await this.namesService.getIDs([taxon.taxid])
                    let taxonNew = taxiddata[0]
                    while (taxonNew.rank == 'no rank') {
                        let receive_data = await this.namesService.getIDs([taxonNew.parentid])
                        taxonNew = receive_data[0]
                    }
                    if (this.UserInputService.order.indexOf(taxonNew.rank) > this.UserInputService.order.indexOf(rank)) {
                        this.UserInputService.rankedTaxa.push(taxiddata[0])
                    } else if (this.UserInputService.order.indexOf(taxonNew.rank) == this.UserInputService.order.indexOf(rank)) {
                        this.UserInputService.rankedTaxa.push(taxonNew)
                    } else {
                        let last_taxon_with_specified_level: TaxIDData
                        while (this.UserInputService.order.indexOf(taxonNew.rank) < this.UserInputService.order.indexOf(rank)) {
                            if (taxonNew.rank != 'no rank') {
                                last_taxon_with_specified_level = taxonNew
                            }
                            let receive_data = await this.namesService.getIDs([taxonNew.parentid])
                            taxonNew = receive_data[0]
                        }
                        if (this.UserInputService.order.indexOf(taxonNew.rank) == this.UserInputService.order.indexOf(rank)) {
                            this.UserInputService.rankedTaxa.push(taxonNew)
                        }
                        if (this.UserInputService.order.indexOf(taxonNew.rank) > this.UserInputService.order.indexOf(rank)) {
                            if (last_taxon_with_specified_level) {
                                this.UserInputService.rankedTaxa.push(last_taxon_with_specified_level)
                            } else {
                                this.UserInputService.rankedTaxa.push(taxonNew)
                            }
                        }
                    }
                }
                this.UserInputService.set_to_set()
                this.taxTable.refreshTable(this.UserInputService.rankedTaxa)
            }
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
